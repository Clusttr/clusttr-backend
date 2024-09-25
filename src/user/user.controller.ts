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
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';
import { UpdateAccountTypeDto } from './dto/updateAccountType.dto';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { MintResDto } from './dto/mint_res.dto';
import { FindUserQueryDto } from './dto/find_user_query.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get user' })
  async getUser(@Request() req: { user: UserDto }): Promise<UserDto> {
    return req.user;
  }

  @Get('/find')
  @ApiOperation({ summary: 'search user' })
  async findUser(@Query() query: FindUserQueryDto): Promise<UserDto> {
    return this.userService.findUser(query);
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

  @Get('/benefactor')
  @ApiOperation({ summary: 'Get benefactors' })
  async getBenefactors(@Request() req: { user: UserDto }): Promise<UserDto[]> {
    const userId = req.user.id;
    return this.userService.getBenefactors(userId);
  }

  @Post('benefactor/:id')
  @ApiOperation({ summary: 'Add beneficiary' })
  async addBenefactor(
    @Request() req: { user: UserDto },
    @Param('id') benefactorId: string,
  ): Promise<UserDto> {
    const userId = req.user.id;
    return this.userService.addBenefactor(userId, benefactorId);
  }

  @Delete('/benefactor/:id')
  @ApiOperation({ summary: 'Delete beneficiary' })
  async removeBenefactor(
    @Request() req: { user: UserDto },
    @Param('id') benefactorId: string,
  ): Promise<UserDto> {
    return this.userService.removeBenefactor(req.user.id, benefactorId);
  }
}
