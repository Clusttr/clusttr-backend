import { IsNotEmpty, IsString } from 'class-validator';

export class BankAccountDetailsReqDto {
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  bankCode: string;
}
