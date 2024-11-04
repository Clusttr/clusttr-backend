import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class FeeInDetail {
  @IsNumber()
  @IsNotEmpty()
  fixedFee: number;

  @IsNumber()
  @IsNotEmpty()
  marginFee: number;

  @IsNumber()
  @IsNotEmpty()
  percentageFee: number;

  @IsNumber()
  @IsNotEmpty()
  totalFee: number;
}
