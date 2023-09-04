import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Connection, Keypair } from '@solana/web3.js';
import { SolanaModule } from 'src/solana/solana.module';

@Module({
    imports: [SolanaModule,],
    controllers: [AccountController],
    providers: [AccountService]
})
export class AccountModule {}
