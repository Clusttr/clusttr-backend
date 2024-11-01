import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { BankService } from './bankAccount.service';
import { UserModule } from 'src/user/user.module';
import { BankController } from './bankAccount.controller';

@Module({})
export class BankModule {}
