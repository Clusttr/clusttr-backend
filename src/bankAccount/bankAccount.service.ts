import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/schemas/user.schemas';
import { BankAccountReqDto } from './dto/bankAccountReq.dto';
import { BankAccountResDto } from './dto/bankAccountRes.dto';
import { AddBankAccountReqDto } from './dto/addBankAccountReq.dto';
import { BankAccount } from './schemas/bankAccount.schema';

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
    let user = await this.userModel.findById(userId).select('bankAccounts');
    let bankAccounts = (user.bankAccounts ??= new Array<BankAccount>());
    console.log({ bankAccounts });
    let accounts = bankAccounts.map((x) => {
      return {
        bank: x.bank,
        accountName: x.accountName,
        accountNumber: x.accountNumber,
      };
    });
    return accounts;
  }

  async addAccount(
    userId: String,
    req: AddBankAccountReqDto,
  ): Promise<BankAccountResDto> {
    //check if bank account already exist
    let user = await this.userModel.findById(userId).select('bankAccounts');
    let bankAccounts: BankAccount[] = (user.bankAccounts ??=
      new Array<BankAccount>());

    let accountExists = bankAccounts.find(
      (x) => x.accountNumber == req.accountNumber && x.bank == req.bank,
    );
    if (accountExists)
      throw new BadRequestException('Bank account already saved');

    let bankAccount: BankAccount = {
      bank: req.bank,
      accountName: req.accountName,
      accountNumber: req.accountNumber,
    };
    await this.userModel.updateOne(
      {
        _id: userId,
      },
      { $push: { bankAccounts: bankAccount } },
    );

    return {
      bank: req.bank,
      accountName: req.accountName,
      accountNumber: req.accountNumber,
    };
  }

  async deleteAccount(
    userId: String,
    req: BankAccountReqDto,
  ): Promise<BankAccountResDto> {
    //check if bank account already exist
    let user = await this.userModel.findById(userId).select('bankAccounts');
    let bankAccount = user.bankAccounts.find(
      (x) => x.accountNumber == req.accountNumber && x.bank == req.bank,
    );
    if (!bankAccount) throw new BadRequestException('Bank account not found.');

    await this.userModel.updateOne(
      {
        _id: userId,
      },
      {
        $pull: { bankAccounts: bankAccount },
      },
    );

    return {
      bank: bankAccount.bank,
      accountName: bankAccount.accountName,
      accountNumber: bankAccount.accountNumber,
    };
  }
}
