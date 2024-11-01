import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BankQueryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code: string;
}
