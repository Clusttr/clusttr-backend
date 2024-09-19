import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';
import { UpdateAccountTypeDto } from './dto/updateAccountType.dto';
import { UserService } from './user.service';
import { UserDto, createUseDto } from './dto/user.dto';
import { MintResDto } from './dto/mint_res.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get user' })
  async getUser(@Request() req) {
    const user = req.user;
    return createUseDto(user);
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
}
