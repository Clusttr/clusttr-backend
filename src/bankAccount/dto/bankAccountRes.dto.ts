import { IsNotEmpty, IsString } from 'class-validator';
import { BankResDto } from 'src/bank/dto/bank-res.dto';
import { BankAccount } from '../schemas/bankAccount.schema';

export class BankAccountResDto {
  @IsNotEmpty()
  @IsString()
  bank: BankResDto;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  accountName: string;

  static create(x: BankAccount): BankAccountResDto {
    return {
      accountName: x.accountName,
      accountNumber: x.accountNumber,
      bank: {
        id: x.bank.id.toString(),
        //@ts-ignore
        name: x.bank.name,
        //@ts-ignore
        code: x.bank.code,
      },
    };
  }
}
