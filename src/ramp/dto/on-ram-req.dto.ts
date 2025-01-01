import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OnRampReqDto {
  @IsNumber()
  amount: number;
}
