import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'The JWT token', example: 'your-token-value' })
  token: string;
}