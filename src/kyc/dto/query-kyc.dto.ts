import { PartialType } from '@nestjs/swagger';
import { CreateKycDto } from './create-kyc.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryKycDto extends PartialType(CreateKycDto) {
  @IsString()
  @IsOptional()
  size: string;

  @IsString()
  @IsOptional()
  page: string;
}
