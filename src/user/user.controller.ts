import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';
import { UpdateAccountTypeDto } from './dto/updateAccountType.dto';
import { UserService } from './user.service';
import { createUserDto, UserDto } from './dto/user.dto';
import { MintResDto } from './dto/mint_res.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get user' })
  async getUser(@Request() req: { user: UserDto }): Promise<UserDto> {
    return req.user;
  }

  @Post('/updateAccountType')
  @ApiOperation({ summary: 'Update User role' })
  async updateAccountType(
    @Request() req,
    @Body() updateValue: UpdateAccountTypeDto,
  ): Promise<UserDto> {
    return this.userService.updateUserRole(updateValue);
  }

  @Post('/airdrop')
  @ApiOperation({ summary: 'Request $100 airdrop' })
  async airdrop(@Request() req): Promise<MintResDto> {
    const user = req.user;
    return this.userService.airdrop(user);
  }

  @Post('benefactor/:id')
  @ApiOperation({ summary: 'Add beneficiary' })
  async addBenefactor(@Request() req, @Param('id') beneficiaryId: string) {
    const userId = req.user.id;
    return this.userService.addBenefactor(userId, beneficiaryId);
  }

  @Delete('/beneficiary')
  @ApiOperation({ summary: 'Delete beneficiary' })
  async deleteBenefactor() {}
}
