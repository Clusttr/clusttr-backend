import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LogInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'idToken',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  readonly idToken: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(44)
  @ApiProperty({ description: "user's pin", example: 'DpmMV7knnwZcBeLXv9dX3fCHA8jCw7SA7Lzq4dvj1NR3' })
  readonly publicKey: string;

  @IsNotEmpty()
  @IsString()
  // @MinLength(4)
  @ApiProperty({ description: "user's pin", example: '1234' })
  readonly pin: string;
}
