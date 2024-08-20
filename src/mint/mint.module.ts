import { Module } from '@nestjs/common';
import { MintService } from './mint.service';
import { MintController } from './mint.controller';

@Module({
  imports: [],
  providers: [MintService],
  controllers: [MintController],
})
export class MintModule {}
