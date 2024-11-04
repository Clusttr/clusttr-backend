import { IsNotEmpty, IsString } from 'class-validator';
import { KycDto } from 'src/kyc/dto/kyc.dto';

export class ScalexOnRampReqDto {
  @IsNotEmpty()
  @IsString()
  amount: number;

  @IsNotEmpty()
  @IsString()
  coin_type: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
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
    address: string,
    country: string,
    kyc: KycDto,
  ): ScalexOnRampReqDto {
    return {
      amount,
      coin_type: 'USDC_SOLANA',
      address: address,
      recipient: {
        name: `${kyc.firstname} ${kyc.lastname}`,
        country: country,
        email: kyc.email,
        idNumber: kyc.idNumber,
        idType: kyc.idType,
        phone: kyc.phone,
      },
    };
  }
}
