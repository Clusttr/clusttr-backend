import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { SolanaModule } from './solana/solana.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { AssetModule } from './asset/asset.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserSchema } from './user/schemas/user.schemas';
import { UploadAssetSchema } from './mint/schema/upload_asset.schema';
import { TokenModule } from './token/token.module';
import { ServiceModule } from './service/service.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DowntownModule } from './downtown/downtown.module';
import { BookmarkService } from './bookmark/bookmark.service';
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MintModule } from './mint/mint.module';
import { MintController } from './mint/mint.controller';
import { MintService } from './mint/mint.service';
import { BankService } from './bankAccount/bankAccount.service';
import { BankController } from './bankAccount/bankAccount.controller';
import { BankModule } from './bankAccount/bankAccount.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    SolanaModule,
    AuthModule,
    WaitlistModule,
    AssetModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'UploadAsset', schema: UploadAssetSchema },
    ]),
    TokenModule,
    DowntownModule,
    BookmarkModule,
    MintModule,
    ServiceModule,
    BankModule,
  ],
  controllers: [
    AppController,
    AccountController,
    AccountController,
    UserController,
    BookmarkController,
    MintController,
    BankController,
  ],
  providers: [
    AppService,
    AccountService,
    UserService,
    BookmarkService,
    MintService,
    BankService,
  ],
})
export class AppModule {
  constructor() {}
}
