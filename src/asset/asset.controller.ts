import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetService } from './asset.service';
import { CreateAssetInstructionDto, MintInstructionDto } from './dto';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';

@ApiTags('Asset')
@Controller('asset')
@UseGuards(JwtAuthGuard)
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('create')
  @ApiBody({ type: CreateAssetInstructionDto })
  @ApiOperation({ summary: 'Asset token (Fugilble Asset)' })
  @ApiResponse({ status: 201, description: 'Transaction Id', type: String })
  async create(@Body() asset: CreateAssetInstructionDto): Promise<string> {
    return this.assetService.create(asset);
  }

  @Post('mint')
  @ApiBody({type: MintInstructionDto })
  @ApiOperation({ summary: 'Mint Asset'})
  @ApiResponse({status: 200, description: "Transaction Id", type: String})
  async mint(@Body() instruction: MintInstructionDto): Promise<string> {
    return this.assetService.mint(instruction)
  }
}
