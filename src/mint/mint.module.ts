import { Module } from '@nestjs/common';
import { MintService } from './mint.service';
import { MintController } from './mint.controller';
import { CloudinaryService } from 'src/service/media_manager/CloudinaryService';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadAssetSchema } from './schema/upload_asset.schema';
import { MetaplexServices } from 'src/service/MetaplexService';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [
    ServiceModule,
    MongooseModule.forFeature([
      { name: 'UploadAsset', schema: UploadAssetSchema },
    ]),
  ],
  providers: [MintService],
  controllers: [MintController],
})
export class MintModule {}
