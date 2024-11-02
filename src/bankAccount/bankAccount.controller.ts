import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BankAccountResDto } from './dto/bankAccountRes.dto';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';
import { BankAccountService } from './bankAccount.service';
import { UserDto } from 'src/user/dto/user.dto';
import { BankAccountReqDto } from './dto/bankAccountReq.dto';
import { AddBankAccountReqDto } from './dto/addBankAccountReq.dto';
import { DeleteBankAccountReqDto } from './dto/deleteBankAccountReq.dto';
import { ApiTags } from '@nestjs/swagger';
import { BankAccountDetailsResDto } from './dto/bank-account-details-res.dto';
import { BankAccountDetailsReqDto } from './dto/bank-account-details-req.dto';

@ApiTags('Bank Account')
@Controller('bank-account')
@UseGuards(JwtAuthGuard)
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Get('/:accountNumber')
  async find(
    @Request() req: { user: UserDto },
    @Param('accountNumber') accountNumber: string,
  ): Promise<BankAccountResDto> {
    console.log({ accountNumber, id: req.user.id });
    return this.bankAccountService.findOne(req.user.id, accountNumber);
  }

  @Get()
  async findAll(
    @Request() req: { user: UserDto },
  ): Promise<BankAccountResDto[]> {
    return this.bankAccountService.findAll(req.user.id);
  }

  @Post()
  async add(
    @Request() req: { user: UserDto },
    @Body() reqDto: AddBankAccountReqDto,
  ): Promise<BankAccountResDto> {
    return this.bankAccountService.add(req.user.id, reqDto);
  }

  @Delete()
  async remove(
    @Request() req: { user: UserDto },
    @Body() reqDto: DeleteBankAccountReqDto,
  ): Promise<boolean> {
    return this.bankAccountService.remove(req.user.id, reqDto);
  }

  @Post('/details')
  async getAccountDetails(
    @Body() req: BankAccountDetailsReqDto,
  ): Promise<BankAccountDetailsResDto> {
    return await this.bankAccountService.getAccountDetails(
      req.accountNumber,
      req.bankCode,
    );
  }
}
