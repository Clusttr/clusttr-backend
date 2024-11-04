import { IsNumber, IsString } from 'class-validator';
import { ScalexOffRampResDto } from 'src/service/ramps/dto/scalex-off-ramp-res.dto';

export class OffRampResDto {
  @IsString()
  reference: string;

  @IsString()
  walletToFund: string;

  @IsNumber()
  selling_amount: number;

  @IsString()
  selling_currency: string;

  @IsString()
  reciving_amount: string;

  @IsString()
  reciving_currency: string;

  @IsString()
  exchange_rate: number;

  @IsString()
  fee: number;

  recipiant_bank_info: {
    bank_name: string;
    bank_code: string;
    account_number: string;
    account_name: string;
  };

  static init(res: ScalexOffRampResDto): OffRampResDto {
    return {
      reference: res.reference,
      walletToFund: res.wallet_to_fund.address,
      selling_amount: res.from_amount,
      selling_currency: res.from_currecny,
      reciving_amount: res.to_amount,
      reciving_currency: res.to_currency,
      exchange_rate: res.rate,
      fee: res.fee,
      recipiant_bank_info: res.recipient_bank_info,
    };
  }
}
