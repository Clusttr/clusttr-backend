import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TokenDto } from './dto/token.dto';
import { TokenService } from './token.service';
import { TokenUploadDto } from './dto/token-upload.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('token')
@ApiTags('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Get("recent")
    @ApiOperation({ summary: "Fetch all tokens from recent tokens"})
    @ApiResponse({status: 200, description: "Return list of recent tokens", type: TokenDto})
    async getRecentTokens(): Promise<TokenDto[]> {
        return this.tokenService.getRecentToken()
    }

    @Post("recent")
    @ApiOperation({ summary: "Add token to list of recent tokens"})
    @ApiBody({type: TokenUploadDto})
    @ApiResponse({status: 201, description: "Return token details", type: TokenDto})
    async addRecentToken(@Body() token: TokenUploadDto): Promise<TokenDto> {
        return this.tokenService.addRecentToken(token)
    }

    @Delete("recent/:id")
    @ApiOperation({ summary: "Delete token from recent tokens"})
    @ApiBody({type: String,})
    @ApiResponse({status: 204, description: "Return token details", type: TokenDto})
    async deleteRecentToken(@Param("id") id: string): Promise<TokenDto> {
        return this.tokenService.deleteRecentToken(id)
    }
}
