import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FeeInDetail } from './fee-in-detail.dto';

export class ScalexOffRampResDto {
  @IsNotEmpty()
  @IsString()
  reference: string;

  @IsNotEmpty()
  @IsString()
  wallet_to_fund: {
    address: string;
    token: string;
    network: string;
  };

  @IsNotEmpty()
  @IsString()
  from_amount: number;

  @IsNotEmpty()
  @IsString()
  from_currecny: string;

  @IsNotEmpty()
  @IsString()
  to_amount: string;

  @IsNotEmpty()
  @IsString()
  to_currency: string;

  @IsNotEmpty()
  @IsString()
  rate_in_usd: number;

  @IsNotEmpty()
  @IsString()
  recipient_bank_info: {
    bank_name: string;
    bank_code: string;
    account_number: string;
    account_name: string;
  };

  @IsNotEmpty()
  @IsNumber()
  rate: number;

  @IsNotEmpty()
  @IsNumber()
  fee: number;

  @IsNotEmpty()
  fee_in_detail: FeeInDetail;
}
