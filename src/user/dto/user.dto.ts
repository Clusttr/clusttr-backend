import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from 'src/enums/ACCOUNT_TYPE';

export class UserDto {
  @ApiProperty({
    description: 'id',
    example: 'uuid#example',
  })
  readonly id: string;

  @ApiProperty({
    description: 'name',
    example: 'John Doe',
  })
  readonly name: string;

  @ApiProperty({
    description: 'role',
    example: 'user'
  })
  readonly accountType: AccountType
}
