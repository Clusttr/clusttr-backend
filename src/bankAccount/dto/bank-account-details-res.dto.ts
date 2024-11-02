import { IsNotEmpty, IsString } from 'class-validator';
import { ScalexAccountDetailsResDto } from 'src/service/ramps/dto/scalex-account-details-res.dto';

export class BankAccountDetailsResDto {
  @IsNotEmpty()
  @IsString()
  accountName: string;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  bankCode: string;

  @IsNotEmpty()
  @IsString()
  bankName: string;

  static init(x: ScalexAccountDetailsResDto): BankAccountDetailsResDto {
    return {
      accountName: x.account_name,
      accountNumber: x.account_number,
      bankCode: x.bank_code,
      bankName: x.bank_name,
    };
  }
}
