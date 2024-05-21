import 'reflect-metadata'
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
import { TokenModule } from './token/token.module';
import { ServiceModule } from './service/service.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DowntownModule } from './downtown/downtown.module';
import { BookmarkService } from './bookmark/bookmark.service';
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    SolanaModule,
    ServiceModule,
    AuthModule,
    WaitlistModule,
    AssetModule,
    UserModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    TokenModule,
    DowntownModule,
    BookmarkModule,
  ],
  controllers: [AppController, AccountController, AccountController, UserController, BookmarkController],
  providers: [AppService, AccountService, UserService, BookmarkService],
})
export class AppModule {}
