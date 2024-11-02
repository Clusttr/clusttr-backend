import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ScalexExchangeRateResDto } from 'src/service/ramps/dto/scalex-exchange-rate-res.dto';

export class TokenExchangeRateRes {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  onramp: Ramp;

  @IsNotEmpty()
  offramp: Ramp;

  static init(
    x: ScalexExchangeRateResDto,
    currency: string,
  ): TokenExchangeRateRes {
    return {
      token: 'USDC',
      currency: currency,
      onramp: { rate: x.onramp.rate_in_ngn, fee: x.fees.onramp_fee },
      offramp: { rate: x.offramp.rate_in_ngn, fee: x.fees.offramp_fee },
    };
  }
}

interface Ramp {
  rate: number;
  fee: number;
}
