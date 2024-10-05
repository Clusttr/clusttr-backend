import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/schemas/user.schemas';
import { BankAccountReqDto } from './dto/bankAccountReq.dto';
import { BankAccountResDto } from './dto/bankAccountRes.dto';

@Injectable()
export class BankService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAccountDetails(
    user: UserDto,
    reqDto: BankAccountReqDto,
  ): Promise<BankAccountResDto> {
    const bankAccount = {
      bank: reqDto.bank,
      accountNumber: reqDto.accountNumber,
      accountName: user.name,
    };
    return bankAccount;
  }

  async getBankAccounts(userId: String): Promise<BankAccountResDto[]> {
    let user = this.userModel.findById(userId).select('bankAccounts');
    let bankAccounts = (await user).bankAccounts;
    let accounts = bankAccounts.map((x) => {
      return {
        bank: x.bank,
        accountName: x.accountName,
        accountNumber: x.accountNumber,
      };
    });
    return accounts;
  }

  addAccount() {}

  deleteAccount() {}
}
