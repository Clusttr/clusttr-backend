import { Body, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { BankAccountResDto } from './dto/bankAccountRes.dto';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';
import { BankService } from './bankAccount.service';
import { UserDto } from 'src/user/dto/user.dto';
import { BankAccountReqDto } from './dto/bankAccountReq.dto';

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
}
