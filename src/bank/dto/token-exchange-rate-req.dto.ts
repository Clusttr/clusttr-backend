import { IsNotEmpty, IsString } from 'class-validator';

export class TokenExchangeRateReq {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  currency: string;
}
