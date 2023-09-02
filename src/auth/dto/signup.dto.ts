import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
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
  @Length(4)
  @ApiProperty({ description: "user's pin", example: '1234' })
  readonly pin: string;
}
