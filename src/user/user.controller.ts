import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';
import { UpdateAccountTypeDto } from './dto/updateAccountType.dto';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/updateAccountType')
    @ApiOperation({ summary: "Update User role"})
    async updateAccountType(@Request() req, @Body() updateValue: UpdateAccountTypeDto): Promise<UserDto> {
        return this.userService.updateUserRole(updateValue)
    }
}
