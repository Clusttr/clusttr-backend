import { IsNotEmpty, IsString } from 'class-validator';

export class ScalexAccountDetailsResDto {
  @IsNotEmpty()
  @IsString()
  account_name: string;

  @IsNotEmpty()
  @IsString()
  account_number: string;

  @IsNotEmpty()
  @IsString()
  bank_code: string;

  @IsNotEmpty()
  @IsString()
  bank_name: string;
}
