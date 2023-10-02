import { Module } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { WaitlistController } from './waitlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WaitlistSchema } from './schemas/waitlist.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Waitlist', schema: WaitlistSchema}])
  ],
  providers: [WaitlistService],
  controllers: [WaitlistController]
})
export class WaitlistModule {}
