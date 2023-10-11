import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, Max, Min } from 'class-validator';

export class BuyAssetInstruction {
  @IsNotEmpty()
  @ApiProperty({
    description: "Buyer's private key",
  })
  readonly buyerPrivateKey: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "Token Address (public key)",
  })
  readonly tokenAddress: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "Number of tokens to purchase",
    example: 3
  })
  readonly amount: number;

//   @IsNotEmpty()
//   @Max(1000, {message: "Max supply can not exceed 1000"})
//   readonly maxSupply: number;
}