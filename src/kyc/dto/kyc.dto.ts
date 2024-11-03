import { PartialType } from '@nestjs/swagger';
import { CreateKycDto } from './create-kyc.dto';
import { Kyc } from '../schemas/kyc.schema';
import { IsString } from 'class-validator';

export class KycDto extends PartialType(CreateKycDto) {
  @IsString()
  id: string;

  static init(id: string, x: Kyc): KycDto {
    return {
      id: id,
      idNumber: x.idNumber,
      idType: x.idType,
      firstname: x.firstname,
      lastname: x.lastname,
      email: x.email,
      phone: x.phone,
    };
  }
}
