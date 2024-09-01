import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetService } from './asset.service';
import { CreateAssetInstructionDto, MintInstructionDto } from './dto';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';
import { CreateAssetResDto } from './dto/create-asset-res.dto';
import { AssetDto } from './dto/asset.dto';

@ApiTags('Asset')
@Controller('asset')
@UseGuards(JwtAuthGuard)
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  // @Post('create')
  // @ApiBody({ type: CreateAssetInstructionDto })
  // @ApiOperation({ summary: 'Asset token (Fugilble Asset)' })
  // @ApiResponse({ status: 201, description: 'Transaction Id', type: String })
  // async create(
  //   @Request() req,
  //   @Body() asset: CreateAssetInstructionDto,
  // ): Promise<CreateAssetResDto> {
  //   // if (req.user.accountType !== AccountType.developer) {
  //   //   throw new UnauthorizedException("Only Developers have access to this endpoint")
  //   // }
  //   return this.assetService.create(req.user, asset);
  // }

  // @Post('mint')
  // @ApiBody({ type: MintInstructionDto })
  // @ApiOperation({ summary: 'Mint Asset' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Create Asset Response',
  //   type: CreateAssetResDto,
  // })
  // async mint(
  //   @Request() req,
  //   @Body() instruction: MintInstructionDto,
  // ): Promise<CreateAssetResDto> {
  //   console.log({ instruction });
  //   // if (req.user.accountType !== AccountType.developer) {
  //   //   throw new UnauthorizedException("Only Developers have access to this endpoint")
  //   // }
  //   return this.assetService.mint(req.user, instruction);
  // }

  // @Get('/:id')
  // @ApiOperation({ summary: 'fetch an asset' })
  // @ApiResponse({ status: 200, description: 'Asset', type: AssetDto })
  // async getAsset(@Param('id') assetId: string): Promise<AssetDto> {
  //   return this.assetService.fetchAsset(assetId);
  // }

  // @Get('creator/:id')
  // @ApiOperation({ summary: 'fetch creators asset' })
  // @ApiResponse({ status: 200, description: 'Assets', type: Array<AssetDto> })
  // async getCreatorsAsset(@Param('id') creator: string): Promise<AssetDto[]> {
  //   return this.assetService.fetchCreatorsAsset(creator);
  // }
}
