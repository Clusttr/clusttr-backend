import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { SolanaModule } from 'src/solana/solana.module';

@Module({
  imports: [
    SolanaModule,
  ],
  providers: [AssetService],
  controllers: [AssetController],
})
export class AssetModule {}
