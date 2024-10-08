import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../user/schemas/user.schemas';
import { createUserDto, UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<UserDto> {
    const { id } = payload;
    const user = await this.userModel
      .findById(id)
      .select('_id name username email profileImage publicKey accountType');

    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }
    return createUserDto(user);
  }
}
