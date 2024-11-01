import { IsNotEmpty, IsString } from 'class-validator';

export class ScalexBankResDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
