import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import { generateAccount } from './utils/get-account';
import { UMIFactory } from './utils/umi';
import { Umi } from '@metaplex-foundation/umi';

@Global()
@Module({
  providers: [
    {
      provide: Connection,
      useValue: new Connection(clusterApiUrl('devnet'), 'single'),
    },
    {
      provide: Keypair,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const payerSecret = config.get<string>('PAYER_SECRET');
        return generateAccount(payerSecret);
      },
    },
    {
      provide: UMIFactory,
      inject: [Keypair, ConfigService],
      useFactory: (keyPair: Keypair, config: ConfigService) => {
        const heliusApiKey = config.get<string>('HELIUS_API_KEY');
        return new UMIFactory(keyPair, heliusApiKey);
      },
    },
  ],
  exports: [Connection, Keypair, UMIFactory],
})
export class SolanaModule {}
