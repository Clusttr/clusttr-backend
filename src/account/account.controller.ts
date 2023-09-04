import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { Keypair } from '@solana/web3.js';
import { TransactionResponseDto } from './dto/TransactionResponse.dto';
import { RegisterAccountDto } from './dto/registerAccount.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { generateAccount } from 'src/solana/utils/get-account';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';

@Controller('account')
@ApiTags('account')
@UseGuards(JwtAuthGuard)
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post("/register")
    @ApiBody({type: RegisterAccountDto})
    @ApiOperation({ summary: "Login Account"})
    @ApiResponse({status: 201, description: "Register use keypair on solana chain", type: TransactionResponseDto})
    async register(@Body() req: RegisterAccountDto): Promise<TransactionResponseDto> {
        const keypair =  generateAccount(req.secret)
        const signature = await this.accountService.registerAccount(keypair)

        return { success: true, signature}
    }
}
