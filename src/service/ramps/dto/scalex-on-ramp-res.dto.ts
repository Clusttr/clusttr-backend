import { IsDate, IsNumber, IsString } from 'class-validator';
import { FeeInDetail } from './fee-in-detail.dto';

export class ScalexOnRampResDto {
  @IsString()
  reference: string;

  @IsNumber()
  from_amount: number;

  @IsString()
  from_currency: string;

  bank_to_fund: {
    account_number: string;
    account_name: string;
    bank_name: string;
  };

  @IsString()
  to_currency: string;

  @IsNumber()
  to_amount: number;

  @IsNumber()
  rate_in_usd: number;

  @IsString()
  recipient: string;

  @IsNumber()
  fee: number;

  fee_in_detail: FeeInDetail;

  @IsNumber()
  rate: number;

  @IsString()
  channel: string;

  @IsDate()
  expires_at: Date;
}
