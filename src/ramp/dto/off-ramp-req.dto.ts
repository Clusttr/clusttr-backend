import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OffRampReqDto {
  @IsNumber()
  amount: number;
  @IsString()
  country: string;
  @IsString()
  accountNumber: string;
}
