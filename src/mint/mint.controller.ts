import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MintService } from './mint.service';
import { UploadAssetDtoReq } from './dto/upload_asset_req.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/service/media_manager/CloudinaryService';
import { UploadAssetQueryDto } from './dto/upload_asset_query.dto';
import { CreateAssetResDto } from 'src/asset/dto/create-asset-res.dto';
import { MintAssetResDto } from './dto/mint_asset_res.dto';
import { MintAssetReqDto } from './dto/mint_asset_req.dto';

@ApiTags('mint')
@Controller('mint')
export class MintController {
  constructor(
    private readonly mintService: MintService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('asset/:id')
  async getAsset(@Param('id') assetId: string): Promise<UploadAssetDtoReq> {
    return this.mintService.getAsset(assetId);
  }

  @Get('asset')
  async getAssets(
    @Query() query: UploadAssetQueryDto,
  ): Promise<UploadAssetDtoReq[]> {
    return this.mintService.searchAsset(query);
  }

  @Post('upload_asset')
  async uploadAsset(
    @Body() asset: UploadAssetDtoReq,
  ): Promise<UploadAssetDtoReq> {
    return this.mintService.uploadAsset(asset);
  }

  @Post('upload_image/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(
    @Param('id') id: string,
    @Query('cover_img') coverImg: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<UploadAssetDtoReq> {
    return await this.mintService.updateAssetMediaURL(id, coverImg, files);
  }

  @Post('update_asset')
  async addMoreInfo(): Promise<string> {
    return this.mintService.addMoreInfo();
  }

  @Post('create/:id')
  async createAsset(@Param('id') assetId: string): Promise<CreateAssetResDto> {
    return this.mintService.createAsset(assetId);
  }

  @Post('mint/:id')
  async mintAsset(
    @Param('id') assetId: string,
    @Body() req: MintAssetReqDto,
  ): Promise<MintAssetResDto> {
    return this.mintService.mintAsset(assetId, req);
  }
}
