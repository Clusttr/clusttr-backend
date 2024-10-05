import { IsNotEmpty, IsString } from 'class-validator';

export class AddBankAccountReqDto {
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
