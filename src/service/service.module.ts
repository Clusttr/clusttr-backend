import { Module } from '@nestjs/common';
import { HeliusService } from './api/HeliusService';
import { ConfigService } from '@nestjs/config';
import { CloudinaryService } from './media_manager/CloudinaryService';
import { MetaplexServices } from './MetaplexService';

@Module({
  imports: [ServiceModule],
  providers: [
    {
      provide: HeliusService,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const heliusSecret = config.get<string>('HELIUS_SECRET');
        return new HeliusService(heliusSecret);
      },
    },
    {
      provide: CloudinaryService,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const cloudName = config.get<string>('CLOUDINARY_CLOUD_NAME');
        const apiKey = config.get<string>('CLOUDINARY_API_KEY');
        const apiSecret = config.get<string>('CLOUDINARY_API_SECRET');
        return new CloudinaryService(cloudName, apiKey, apiSecret);
      },
    },
    MetaplexServices,
  ],
  exports: [HeliusService, CloudinaryService, MetaplexServices],
})
export class ServiceModule {}
