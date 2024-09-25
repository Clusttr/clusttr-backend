import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountType } from 'src/enums/ACCOUNT_TYPE';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { createUserDto, UserDto } from './dto/user.dto';
import { UpdateAccountTypeDto } from './dto/updateAccountType.dto';
import { MetaplexServices } from 'src/service/MetaplexService';
import { MintResDto } from './dto/mint_res.dto';
import { CONST } from '../utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly metaplexService: MetaplexServices,
  ) {}

  async getUser(id: string): Promise<UserDto> {
    let user = await this.userModel
      .findById(id)
      .select('_id name email profileImage publicKey accountType');
    return createUserDto(user);
  }

  async getUsers(ids: string[]): Promise<UserDto[]> {
    let users = await this.userModel.find({
      _id: { $in: ids },
    });
    return users.map((x) => createUserDto(x));
  }

  async updateUserRole(update: UpdateAccountTypeDto): Promise<UserDto> {
    const user = await this.userModel.findById(update.userId);
    if (user.accountType !== AccountType.admin) {
      throw new ForbiddenException('Admin level persion required');
    }

    try {
      const result = await this.userModel.findOneAndUpdate(
        { _id: update.userId },
        { accountType: update.accountType },
      );
      return createUserDto(result);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async airdrop(user: User): Promise<MintResDto> {
    let amount = 10_000_000;
    let txSig = await this.metaplexService.mintToken(
      CONST.USDC_PUBKEY,
      amount,
      user.publicKey,
    );
    return { amount, mint: CONST.USDC_PUBKEY, txSig };
  }

  async getBenefactors(userId: string): Promise<UserDto[]> {
    const user = await this.userModel.findById(userId).select('benefactors');
    return this.getUsers(user.benefactors);
  }

  async addBenefactor(userId: string, benefactorId: string): Promise<UserDto> {
    let benefactor = await this.getUser(benefactorId);
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { benefactors: benefactorId } },
      { runValidators: true },
    );
    return benefactor;
  }
}
