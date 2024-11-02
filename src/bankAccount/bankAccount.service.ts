import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/schemas/user.schemas';
import { BankAccountReqDto } from './dto/bankAccountReq.dto';
import { BankAccountResDto } from './dto/bankAccountRes.dto';
import { AddBankAccountReqDto } from './dto/addBankAccountReq.dto';
import { BankAccount } from './schemas/bankAccount.schema';
import * as bcrypt from 'bcryptjs';
import { DeleteBankAccountReqDto } from './dto/deleteBankAccountReq.dto';
import { Bank } from '../bank/schema/bank.schema';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Bank.name) private bankModel: Model<Bank>,
  ) {}

  async findOne(
    userId: string,
    accountNumber: string,
  ): Promise<BankAccountResDto> {
    const userResult = await this.userModel
      .findOne({ _id: userId }) //, 'bankAccounts.bank': reqDto.bank })
      .populate({
        path: 'bankAccounts.bank', // Populate `bank` inside each `bankAccount`
        model: 'Bank',
      })
      .select('bankAccounts');

    if (!userResult) {
      throw new NotFoundException(`User not found for user with ID ${userId}.`);
    }

    let bankAccount = userResult.bankAccounts.find(
      (x) => x.accountNumber == accountNumber,
    );

    if (!bankAccount)
      throw new NotFoundException(
        `Bank account not found for user with ID ${accountNumber}.`,
      );
    return BankAccountResDto.create(bankAccount);
  }

  async findAll(userId: String): Promise<BankAccountResDto[]> {
    const userResult = await this.userModel
      .findOne({ _id: userId })
      .populate({
        path: 'bankAccounts.bank', // Populate `bank` inside each `bankAccount`
        model: 'Bank',
      })
      .select('bankAccounts');

    if (!userResult) {
      throw new NotFoundException(
        `Bank account not found for user with ID ${userId}.`,
      );
    }

    return userResult.bankAccounts.map((x) => BankAccountResDto.create(x));
  }

  async add(
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
      (x) =>
        x.accountNumber == req.accountNumber && x.bank.toString() == req.bank,
    );

    if (accountExists)
      throw new BadRequestException('Bank account already saved');

    //validate bank id
    let bank = await this.bankModel.findById(req.bank);
    if (!bank) throw new BadRequestException('Invalid bank ID');

    let bankAccount: BankAccount = {
      bank: new Types.ObjectId(req.bank),
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
      bank: {
        id: bank._id.toString(),
        name: bank.name,
        code: bank.code,
      },
      accountName: req.accountName,
      accountNumber: req.accountNumber,
    };
  }

  async remove(userId: String, req: DeleteBankAccountReqDto): Promise<boolean> {
    let user = await this.userModel.findById(userId).select('bankAccounts pin');

    //verify pin
    const isPasswordMatched = await bcrypt.compare(req.pin, user.pin);
    if (!isPasswordMatched)
      throw new BadRequestException(["Can't continue operation, wrong pin"]);

    //check if bank account already exist
    let bankAccount = user.bankAccounts.find(
      (x) =>
        x.accountNumber == req.accountNumber && x.bank.toString() == req.bank,
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

    return true;
  }
}
