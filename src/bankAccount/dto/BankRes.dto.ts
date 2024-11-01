import { IsNotEmpty, IsString } from 'class-validator';

export class BankResDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
