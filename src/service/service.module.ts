import { Module } from '@nestjs/common';
import { HeliusService } from './api/HeliusService';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [
        {
            provide: HeliusService,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const heliusSecret = config.get<string>('HELIUS_SECRET');
                return new HeliusService(heliusSecret)
            }
        }
    ],
    exports: [HeliusService]
})
export class ServiceModule {}
