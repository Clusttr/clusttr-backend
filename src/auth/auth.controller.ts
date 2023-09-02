import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongooseExceptionFilter } from 'src/exceptions/mongoose-exception.filter';
import { AuthResponseDto } from './dto/authResponse.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/signup")
    @ApiOperation({ summary: "Create Account"})
    @ApiBody({type: SignUpDto})
    @ApiResponse({status: 201, description: "Returns access token", type: AuthResponseDto})
    @UseFilters(MongooseExceptionFilter)
    private signUp(@Body() signUp: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUp)
    }

    @Post("/login")
    @ApiOperation({ summary: "Login Account"})
    @ApiBody({type: LogInDto})
    @ApiResponse({status: 201, description: "Returns access token", type: AuthResponseDto})
    login(@Body() login: LogInDto): Promise<{ token: string }> {
        return this.authService.login(login)
    }
}
