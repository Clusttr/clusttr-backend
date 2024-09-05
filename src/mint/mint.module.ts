import { Module } from '@nestjs/common';
import { MintService } from './mint.service';
import { MintController } from './mint.controller';
import { CloudinaryService } from 'src/service/media_manager/CloudinaryService';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadAssetSchema } from './schema/upload_asset.schema';
import { MetaplexServices } from 'src/service/MetaplexService';

@Module({
  imports: [
    CloudinaryService,
    MetaplexServices,
    MongooseModule.forFeature([
      { name: 'UploadAsset', schema: UploadAssetSchema },
    ]),
  ],
  providers: [MintService, CloudinaryService, MetaplexServices],
  controllers: [MintController],
})
export class MintModule {}
