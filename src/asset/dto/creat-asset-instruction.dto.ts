import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, Max, Min } from 'class-validator';

export class CreateAssetInstructionDto {
  @IsNotEmpty()
  @Max(30, {message: "Name must not exceed 30 characters"})
  @Min(5, {message: "Name must be at least 5 characters"})
  @ApiProperty({
    description: "Asset Name",
    example: "Lotus ex suite"
  })
  readonly name: string;

  @IsNotEmpty()
  @Max(4, {message: "Symbol must not exceed 4 characters"})
  @Min(3, {message: "Symbol must be at least 3 characters"})
  @ApiProperty({
    description: "Asset Symbol",
    example: "LEX"
  })
  readonly symbol: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: "Asset URI",
    example: "Asset URI hosted on IPFS"
  })
  readonly uri: string;

  @IsNotEmpty()
  @Max(1000, {message: "Max supply can not exceed 1000"})
  readonly maxSupply: number;
}
