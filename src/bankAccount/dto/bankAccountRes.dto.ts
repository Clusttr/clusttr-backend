import { IsNotEmpty, IsString } from 'class-validator';

export class BankAccountResDto {
  @IsNotEmpty()
  @IsString()
  bank: string;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  accountName: string;
}
