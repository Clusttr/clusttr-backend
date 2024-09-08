import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAssetReqDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Token Address',
  })
  readonly privateKey: string;
}