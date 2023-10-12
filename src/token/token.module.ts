import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TokenSchema } from './schema/token.schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'RecentToken', schema: TokenSchema }])],
  providers: [TokenService],
  controllers: [TokenController]
})
export class TokenModule {}
