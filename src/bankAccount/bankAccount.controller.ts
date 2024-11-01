import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BankAccountResDto } from './dto/bankAccountRes.dto';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';
import { BankService } from './bankAccount.service';
import { UserDto } from 'src/user/dto/user.dto';
import { BankAccountReqDto } from './dto/bankAccountReq.dto';
import { AddBankAccountReqDto } from './dto/addBankAccountReq.dto';
import { DeleteBankAccountReqDto } from './dto/deleteBankAccountReq.dto';
import { BankResDto } from './dto/BankRes.dto';
import { UpdateBanksResDto } from './dto/updateBanksRes.dto';
import { BankQueryDto } from './dto/BankQuery.dto';

@Controller('bank')
@UseGuards(JwtAuthGuard)
export class BankController {
  constructor(private readonly bankAccountService: BankService) {}

  @Get('/details')
  async getAccountDetails(
    @Request() req: { user: UserDto },
    @Query() reqDto: BankAccountReqDto,
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
    @Body() reqDto: AddBankAccountReqDto,
  ): Promise<BankAccountResDto> {
    return this.bankAccountService.addAccount(req.user.id, reqDto);
  }

  @Delete()
  async deleteBankAccount(
    @Request() req: { user: UserDto },
    @Body() reqDto: DeleteBankAccountReqDto,
  ): Promise<BankAccountResDto> {
    return this.bankAccountService.deleteAccount(req.user.id, reqDto);
  }

  //bank service
  @Get('/banks')
  async getBanks(@Query() query: BankQueryDto): Promise<Array<BankResDto>> {
    return this.bankAccountService.fetchBanks(query);
  }

  @Post('/banks/update')
  async updateBanks(): Promise<UpdateBanksResDto> {
    return this.bankAccountService.updateBanks();
  }
}
