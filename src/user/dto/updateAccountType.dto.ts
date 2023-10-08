import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AccountType } from 'src/enums/ACCOUNT_TYPE';

export class UpdateAccountTypeDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'user ID',
    example: '6A0bh12i',
    required: true,
  })
  readonly userId: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'accountType',
    example: '0',
    required: true,
  })
  readonly accountType: AccountType;
}
