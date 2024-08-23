import { Module } from '@nestjs/common';
import { MintService } from './mint.service';
import { MintController } from './mint.controller';
import { CloudinaryService } from 'src/service/media_manager/CloudinaryService';

@Module({
  imports: [CloudinaryService],
  providers: [MintService, CloudinaryService],
  controllers: [MintController],
})
export class MintModule {}
