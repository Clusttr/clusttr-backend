import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountType } from 'src/enums/ACCOUNT_TYPE';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { UpdateAccountTypeDto } from './dto/updateAccountType.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async updateUserRole(update: UpdateAccountTypeDto): Promise<UserDto> {
    console.log(update)
    const user = await this.userModel.findById(update.userId);
    if (user.accountType !== AccountType.admin) {
      throw new ForbiddenException('Admin level persion required');
    }

    try {
      const result = await this.userModel.findOneAndUpdate(
        { _id: update.userId },
        { accountType: update.accountType},
      );
      return {
        id: update.userId,
        name: result.name,
        accountType: result.accountType,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
