import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from '../schemas/user.schemas';

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
  readonly type: AccountType
}
