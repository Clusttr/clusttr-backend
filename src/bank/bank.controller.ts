import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BankService } from './bank.service';
import { BankQueryDto } from './dto/bank-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  findAll(@Query() query: BankQueryDto) {
    return this.bankService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankService.findOne(id);
  }

  @Patch()
  update() {
    return this.bankService.update();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankService.remove(id);
  }
}
