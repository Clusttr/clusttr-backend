import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BankAccountResDto } from 'src/bankAccount/dto/bankAccountRes.dto';
import { KycDto } from 'src/kyc/dto/kyc.dto';

export class ScalexOffRampReqDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  coin_type: string;

  @IsNotEmpty()
  recipient_bank_info: {
    account_number: string;
    bank_code: string;
  };

  @IsNotEmpty()
  recipient: {
    name: string;
    country: string;
    address?: string;
    dob?: string;
    email: string;
    idNumber: string;
    idType: string;
    phone: string;
  };

  static init(
    amount: number,
    country: string,
    kyc: KycDto,
    bankAccount: BankAccountResDto,
  ): ScalexOffRampReqDto {
    return {
      amount,
      coin_type: 'USDC_SOLANA',
      recipient_bank_info: {
        account_number: bankAccount.accountNumber,
        bank_code: bankAccount.bank.code,
      },
      recipient: {
        name: `${kyc.firstname} ${kyc.lastname}`,
        country,
        email: kyc.email,
        idNumber: kyc.idNumber,
        idType: kyc.idType,
        phone: kyc.phone,
      },
    };
  }
}
