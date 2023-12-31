import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAssetResDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Token Address',
  })
  readonly token: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Transaction Signature',
  })
  readonly txSig: string;
}
