import { IsNotEmpty, IsString } from 'class-validator';

export class ScalexExchangeRateResDto {
  @IsNotEmpty()
  onramp: Ramp;

  @IsNotEmpty()
  offramp: Ramp;

  @IsNotEmpty()
  fees: Fees;
}

interface Ramp {
  token: string;
  network: string;
  rate_in_ngn: number;
  rate_in_usd: number;
}

interface Fees {
  onramp_fee: number;
  offramp_fee: number;
}

// interface Offramp {
//     token: string
//     network: string
//     rate_in_ngn: number
//     rate_in_usd: number
//   }
