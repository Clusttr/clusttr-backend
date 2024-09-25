import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AccountType } from 'src/enums/ACCOUNT_TYPE';

export class MintResDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Amount of tokens minted',
    example: '100',
    required: true,
  })
  readonly amount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Mint Key',
    example: '3es74o8wDr3e78opFkQttaaAbnjsUewM62QLPx2cxZmM',
    required: true,
  })
  readonly mint: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Transaction Signature',
    example: '0',
    required: true,
  })
  readonly txSig: string;
}
