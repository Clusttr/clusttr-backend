import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBanksResDto {
  @IsNotEmpty()
  @IsNumber()
  numberOfBanksUpdated: number;
}
