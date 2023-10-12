import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { AccountModule } from './account/account.module';
import { SolanaModule } from './solana/solana.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { AssetModule } from './asset/asset.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserSchema } from './user/schemas/user.schemas';
import { TokenSchema } from './token/schema/token.schemas';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.DB_URI),
    SolanaModule,
    AuthModule,
    WaitlistModule,
    AssetModule,
    UserModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    TokenModule,
  ],
  controllers: [AppController, AccountController, AccountController, UserController],
  providers: [AppService, AccountService, UserService],
})
export class AppModule {}
