import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/schemas/user.schemas';
import { BankAccountReqDto } from './dto/bankAccountReq.dto';
import { BankAccountResDto } from './dto/bankAccountRes.dto';
import { AddBankAccountReqDto } from './dto/addBankAccountReq.dto';
import { BankAccount } from './schemas/bankAccount.schema';
import * as bcrypt from 'bcryptjs';
import { DeleteBankAccountReqDto } from './dto/deleteBankAccountReq.dto';
import { BankResDto } from './dto/BankRes.dto';
import { Bank } from './schemas/bank.schema';
import { UpdateBanksResDto } from './dto/updateBanksRes.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BankQueryDto } from './dto/BankQuery.dto';
import { ScalexServices } from 'src/service/ramps/ScalexServices';

@Injectable()
export class BankService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Bank.name) private bankModel: Model<Bank>,
    private readonly scalexService: ScalexServices,
  ) {}

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
    let user = await this.userModel.findById(userId).select('bankAccounts pin');

    //verify pin
    const isPasswordMatched = await bcrypt.compare(req.pin, user.pin);
    if (!isPasswordMatched)
      throw new BadRequestException("Can't continue operation, wrong pin");

    //check if bank account already exist
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
    req: DeleteBankAccountReqDto,
  ): Promise<BankAccountResDto> {
    let user = await this.userModel.findById(userId).select('bankAccounts pin');

    //verify pin
    const isPasswordMatched = await bcrypt.compare(req.pin, user.pin);
    if (!isPasswordMatched)
      throw new BadRequestException(["Can't continue operation, wrong pin"]);

    //check if bank account already exist
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

  async fetchBanks(query: BankQueryDto): Promise<Array<BankResDto>> {
    let name = new RegExp(query.name, 'i');
    let code = new RegExp(query.code, 'i');
    let result = await this.bankModel.find({
      name,
      code,
    });
    return result.map((x) => ({ name: x.name, code: x.code }));
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async updateBanks(): Promise<UpdateBanksResDto> {
    let banks = await this.scalexService.fetchBanksFromScaleX();

    let banksSchema: Array<Bank> = banks.map((x) => {
      let bank = new Bank();
      bank.name = x.name;
      bank.code = x.code;
      return bank;
    });

    let result = await this.bankModel.bulkWrite(
      banksSchema.map((x) => ({
        updateMany: {
          filter: { name: x.name },
          update: { $set: x },
          upsert: true,
        },
      })),
    );

    return { numberOfBanksUpdated: result.upsertedCount };
  }
}
