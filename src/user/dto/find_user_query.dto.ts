import { IsOptional, IsString } from 'class-validator';

export class FindUserQueryDto {
  @IsOptional()
  @IsString()
  publicKey: string;
}
