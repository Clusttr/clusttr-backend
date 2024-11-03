import { IsOptional, IsString } from 'class-validator';
import { Kyc } from '../schemas/kyc.schema';

export class CreateKycDto {
  @IsString()
  idNumber: string;

  @IsString()
  idType: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  static schema(x: CreateKycDto): Kyc {
    return {
      idNumber: x.idNumber,
      idType: x.idType,
      firstname: x.firstname,
      lastname: x.lastname,
      email: x.email,
      phone: x.phone,
    };
  }
}
