import { Body, Controller, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongooseExceptionFilter } from 'src/exceptions/mongoose-exception.filter';
import { AuthResponseDto } from './dto/authResponse.dto';
import { UpdateUserRoleDto } from './dto/updateUserRole.dto';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @Post("/signup")
    // @ApiOperation({ summary: "Create Account"})
    // @ApiBody({type: SignUpDto})
    // @ApiResponse({status: 201, description: "Returns access token", type: AuthResponseDto})
    // @UseFilters(MongooseExceptionFilter)
    private signUp(@Body() signUp: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUp)
    }

    @Post("/login")
    @ApiOperation({ summary: "Login User"})
    @ApiBody({type: LogInDto})
    @ApiResponse({status: 201, description: "Returns access token", type: AuthResponseDto})
    login(@Body() login: LogInDto): Promise<{ token: string }> {
        return this.authService.login(login)
    }

    @Post('/updaterole')
    @ApiOperation({ summary: "Update User role"})
    @UseGuards(JwtAuthGuard)
    async updateRole(@Request() req, @Body() updateValue: UpdateUserRoleDto): Promise<UserDto> {
        return this.authService.updateUserRole(req.user.id, updateValue.accountType)
    }
}
