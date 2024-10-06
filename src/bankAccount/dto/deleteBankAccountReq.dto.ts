import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteBankAccountReqDto {
  @IsNotEmpty()
  @IsString()
  bank: string;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  pin: string;
}
