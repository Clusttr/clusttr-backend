import { IsNotEmpty, IsString } from 'class-validator';

export class BankAccountReqDto {
  @IsNotEmpty()
  @IsString()
  bank: string;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;
}
