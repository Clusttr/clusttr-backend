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
import { BankAccountService } from './bankAccount/bankAccount.service';
import { BankAccountController } from './bankAccount/bankAccount.controller';
import { BankAccountModule } from './bankAccount/bankAccount.module';
import { BankSchema } from './bank/schema/bank.schema';
import { BankModule } from './bank/bank.module';
import { BankController } from './bank/bank.controller';
import { BankService } from './bank/bank.service';
import { KycModule } from './kyc/kyc.module';
import { KycSchema } from './kyc/schemas/kyc.schema';
import { KycService } from './kyc/kyc.service';
import { KycController } from './kyc/kyc.controller';

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
    MongooseModule.forFeature([{ name: 'Bank', schema: BankSchema }]),
    MongooseModule.forFeature([
      { name: 'UploadAsset', schema: UploadAssetSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Kyc', schema: KycSchema }]),
    TokenModule,
    DowntownModule,
    BookmarkModule,
    MintModule,
    ServiceModule,
    BankAccountModule,
    BankModule,
    KycModule,
  ],
  controllers: [
    AppController,
    AccountController,
    AccountController,
    UserController,
    BookmarkController,
    MintController,
    BankAccountController,
    BankController,
    KycController,
  ],
  providers: [
    AppService,
    AccountService,
    UserService,
    BookmarkService,
    MintService,
    BankAccountService,
    BankService,
    KycService,
  ],
})
export class AppModule {
  constructor() {}
}
