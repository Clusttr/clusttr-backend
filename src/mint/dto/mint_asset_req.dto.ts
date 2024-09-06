import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MintAssetReqDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Token Address',
  })
  readonly privateKey: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Transaction Signature',
  })
  readonly amount: number;
}

enum AmountMintable {
  one,
  ten,
  hundred,
  thousand,
}
