import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ChangePinDto {
  @IsNotEmpty()
  @IsString()
  oldPin: string;

  @IsNotEmpty()
  @IsString()
  newPin: string;
}
