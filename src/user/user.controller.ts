import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';
import { UpdateAccountTypeDto } from './dto/updateAccountType.dto';
import { UserService } from './user.service';
import { UserDto, createUseDto } from './dto/user.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({summary: "Get user"})
    async getUser(@Request() req) {
        const user = req.user
        return createUseDto(user)
    }

    @Post('/updateAccountType')
    @ApiOperation({ summary: "Update User role"})
    async updateAccountType(@Request() req, @Body() updateValue: UpdateAccountTypeDto): Promise<UserDto> {
        return this.userService.updateUserRole(updateValue)
    }
}