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
import { TokenExchangeRateReq } from './dto/token-exchange-rate-req.dto';
import { TokenExchangeRateRes } from './dto/token-exchange-rate-res.dto';
import { BankResDto } from './dto/bank-res.dto';
import { UpdateBanksResDto } from './dto/update-banks-res.dto';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  findAll(@Query() query: BankQueryDto): Promise<Array<BankResDto>> {
    return this.bankService.findAll(query);
  }

  @Get('/rate')
  getRate(
    @Query() { token, currency }: TokenExchangeRateReq,
  ): Promise<TokenExchangeRateRes> {
    return this.bankService.getRate(token, currency);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BankResDto> {
    return this.bankService.findOne(id);
  }

  @Patch()
  update(): Promise<UpdateBanksResDto> {
    return this.bankService.update();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Boolean> {
    return this.bankService.remove(id);
  }
}
