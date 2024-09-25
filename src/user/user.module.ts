import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schemas';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtStrategy } from 'src/middlewere/jwt.strategy';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ServiceModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
