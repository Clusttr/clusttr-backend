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
import { Keypair } from '@solana/web3.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    SolanaModule
  ],
  controllers: [AppController, AccountController, AccountController],
  providers: [AppService, AccountService],
})
export class AppModule {}
