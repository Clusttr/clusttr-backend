import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from 'src/enums/ACCOUNT_TYPE';
import { User } from '../schemas/user.schemas';
import { Types } from 'mongoose';

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
    description: 'email',
    example: 'johndoe@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'profile Image',
    example:
      'https://s.gravatar.com/avatar/12e2fc7fa7f5cc5d2f09990379004fab?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fto.png',
  })
  readonly profileImage: string;

  @ApiProperty({
    description: 'public key',
    example: 'HkkVS92U3WwxZz1VKJ2ocD4S4prjHiKz9EBCaGD2s8Fb',
  })
  readonly publicKey;

  @ApiProperty({
    description: 'role',
    example: 'user',
  })
  readonly accountType: AccountType;
}

export function createUseDto(
  user: User & {
    _id: Types.ObjectId;
  },
): UserDto {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    publicKey: user.publicKey,
    accountType: user.accountType,
  };
}
