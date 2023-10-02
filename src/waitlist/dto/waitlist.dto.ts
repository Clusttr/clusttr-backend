import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class WaitlistDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'email',
    example:
      'JohnDoe@example.com',
  })
  readonly email: string;
}
