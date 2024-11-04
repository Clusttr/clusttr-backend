import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankAccountService } from 'src/bankAccount/bankAccount.service';
import { BankAccount } from 'src/bankAccount/schemas/bankAccount.schema';
import { Kyc } from 'src/kyc/schemas/kyc.schema';
import { ScalexOffRampReqDto } from 'src/service/ramps/dto/scalex-off-ramp-req.dto';
import { ScalexServices } from 'src/service/ramps/ScalexServices';
import { User } from 'src/user/schemas/user.schemas';
import { OffRampResDto } from './dto/off-ramp-res.dto';
import { OffRampReqDto } from './dto/off-ramp-req.dto';
import { KycService } from 'src/kyc/kyc.service';
import { ScalexOnRampReqDto } from 'src/service/ramps/dto/scalex-on-ramp-req.dto';
import { OnRampReqDto } from './dto/on-ram-req.dto';
import { OnRampResDto } from './dto/on-ramp-res.dto';

@Injectable()
export class RampService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private kycService: KycService,
    private bankAccountService: BankAccountService,
    private scalexService: ScalexServices,
  ) {}

  async offRamp(
    userId: string,
    { amount, country, accountNumber }: OffRampReqDto,
  ): Promise<OffRampResDto> {
    const user = await this.userModel.findById(userId);
    const bankAccount = await this.bankAccountService.findOne(
      userId,
      accountNumber,
    );
    const kyc = await this.kycService.findOne(user.kyc.toString());

    let offRampReq = ScalexOffRampReqDto.init(
      amount,
      country,
      kyc,
      bankAccount,
    );

    const res = await this.scalexService.offRamp(offRampReq);
    return OffRampResDto.init(res);
  }

  async onRamp(
    userId: string,
    { amount }: OnRampReqDto,
  ): Promise<OnRampResDto> {
    const user = await this.userModel.findById(userId);
    const kyc = await this.kycService.findOne(user.kyc.toString());
    let onRampReq = ScalexOnRampReqDto.init(amount, user.publicKey, 'NG', kyc);
    const res = await this.scalexService.onRamp(onRampReq);
    return OnRampResDto.init(res);
  }
}
