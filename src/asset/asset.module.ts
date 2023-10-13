import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { SolanaModule } from 'src/solana/solana.module';
import { HeliusService } from 'src/service/api/HeliusService';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [
    SolanaModule,
    ServiceModule
  ],
  providers: [AssetService],
  controllers: [AssetController],
})
export class AssetModule {}
