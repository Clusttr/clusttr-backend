import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';

interface AuthJWTPayload {
  email: string;
  name: string;
  profileImage: string;
}

interface AuthResponseDTO {
  token: string
  isNewUser: boolean
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUp: SignUpDto): Promise<AuthResponseDTO> {
    const { idToken, pin } = signUp;
    const hashedPin = await bcrypt.hash(pin, 10);

    const payload: AuthJWTPayload = this.jwtService.decode(
      idToken,
    ) as AuthJWTPayload;

    try {
      const user = await this.userModel.create({
        ...payload,
        pin: hashedPin,
        profileImage: payload.profileImage,
        accountType: 0,
      });

      const token = this.jwtService.sign({ id: user._id });
      return { token, isNewUser: true};
    } catch (error) {
      throw new ForbiddenException('Credentails taken');
    }
  }

  async login(login: LogInDto): Promise<AuthResponseDTO> {
    const { idToken, pin } = login;

    const payload: AuthJWTPayload = this.jwtService.decode(
      idToken,
    ) as AuthJWTPayload;
    
    const user = await this.userModel.findOne({ email: payload.email });
    if (!user) {
      //Create User
      const signUpDto: SignUpDto = {idToken: idToken, pin}
      const token = await this.signUp(signUpDto)
      return token
    }

    const isPasswordMatched = await bcrypt.compare(pin, user.pin);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token, isNewUser: false };
  }
}