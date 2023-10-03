import { Body, Controller, Post } from '@nestjs/common';
import { AssetDto } from './dto/creat-asset.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetService } from './asset.service';

@ApiTags('Asset')
@Controller('asset')
export class AssetController {
    constructor(private readonly assetService: AssetService) {}

    @Post('create')
    @ApiBody({type: AssetDto})
    @ApiOperation({summary: "Asset token (Fugilble Asset)"})
    @ApiResponse({status: 201, description: "Transaction Id", type: String})
    async create(@Body() asset: AssetDto): Promise<string> {
        return this.assetService.create(asset)
    }

    async createCandyShop() {

    }

    async deleteCandyShop() {

    }
}
