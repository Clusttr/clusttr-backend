import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BankAccountResDto } from './dto/bankAccountRes.dto';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';
import { BankService } from './bankAccount.service';
import { UserDto } from 'src/user/dto/user.dto';
import { BankAccountReqDto } from './dto/bankAccountReq.dto';
import { AddBankAccountReqDto } from './dto/addBankAccountReq.dto';

@Controller('bank')
@UseGuards(JwtAuthGuard)
export class BankController {
  constructor(private readonly bankAccountService: BankService) {}

  @Get()
  async getAccountDetails(
    @Request() req: { user: UserDto },
    @Body() reqDto: BankAccountReqDto,
  ): Promise<BankAccountResDto> {
    return this.bankAccountService.getAccountDetails(req.user, reqDto);
  }

  @Get()
  async getBankAccounts(
    @Request() req: { user: UserDto },
  ): Promise<BankAccountResDto[]> {
    return this.bankAccountService.getBankAccounts(req.user.id);
  }

  @Post()
  async addBankAccount(
    @Request() req: { user: UserDto },
    reqDto: AddBankAccountReqDto,
  ): Promise<BankAccountResDto> {
    return this.bankAccountService.addAccount(req.user.id, reqDto);
  }
}
