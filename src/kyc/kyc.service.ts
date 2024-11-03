import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateKycDto } from './dto/create-kyc.dto';
import { UpdateKycDto } from './dto/update-kyc.dto';
import { Kyc } from './schemas/kyc.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { KycDto } from './dto/kyc.dto';
import { User } from 'src/user/schemas/user.schemas';

@Injectable()
export class KycService {
  constructor(
    @InjectModel(Kyc.name) private kycModel: Model<Kyc>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(userId: string, createKycDto: CreateKycDto): Promise<KycDto> {
    let kyc = CreateKycDto.schema(createKycDto);
    const res = await this.kycModel.create(kyc);
    const _ = await this.userModel.updateOne({ _id: userId }, { kyc: res._id });
    return KycDto.init(res._id.toString(), res);
  }

  async findAll(): Promise<Array<KycDto>> {
    let res = await this.kycModel.find();
    return res.map((x) => KycDto.init(x._id.toString(), x));
  }

  async findOne(id: string): Promise<KycDto> {
    let res = await this.kycModel.findById(id);
    return KycDto.init(res._id.toString(), res);
  }

  async update(id: string, updateKycDto: UpdateKycDto): Promise<boolean> {
    let _ = await this.kycModel.updateOne({ _id: id }, updateKycDto);
    return true;
  }

  async remove(userId: string, id: string): Promise<boolean> {
    let user = await this.userModel.findById(userId);
    if (user.kyc.toString() !== id)
      throw new UnauthorizedException(
        'Action can only be carried out by owner',
      );
    let res = await this.kycModel.deleteOne({ _id: id });
    return res.acknowledged;
  }
}
