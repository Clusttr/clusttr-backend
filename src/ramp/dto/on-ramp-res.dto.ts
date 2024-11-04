import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ScalexOnRampResDto } from 'src/service/ramps/dto/scalex-on-ramp-res.dto';

export class OnRampResDto {
  @IsString()
  reference: string;

  @IsNumber()
  sellingAmount: number;

  @IsString()
  sellingCurrency: string;

  @IsNumber()
  receivingAmount: number;

  @IsString()
  receivingCurrency: string;

  @IsNumber()
  exchangeRate: number;

  @IsNumber()
  fee: number;

  @IsNumber()
  recipient: string;

  @IsNumber()
  expiresAt: Date;

  bankToFund: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };

  static init(res: ScalexOnRampResDto): OnRampResDto {
    return {
      reference: res.reference,
      sellingAmount: res.from_amount,
      sellingCurrency: res.from_currency,
      receivingAmount: res.to_amount,
      receivingCurrency: res.to_currency,
      exchangeRate: res.rate,
      fee: res.fee,
      recipient: res.recipient,
      expiresAt: res.expires_at,
      bankToFund: {
        accountNumber: res.bank_to_fund.account_number,
        accountName: res.bank_to_fund.account_name,
        bankName: res.bank_to_fund.bank_name,
      },
    };
  }
}
