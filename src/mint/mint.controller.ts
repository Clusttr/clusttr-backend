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
import { UploadAssetDto } from './dto/upload_asset.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/service/media_manager/CloudinaryService';
import { UploadAssetQueryDto } from './dto/upload_asset_query.dto';
import { CreateAssetResDto } from 'src/asset/dto/create-asset-res.dto';
import { MintAssetResDto } from './dto/mint_asset_res.dto';

@ApiTags('mint')
@Controller('mint')
export class MintController {
  constructor(
    private readonly mintService: MintService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('asset/:id')
  async getAsset(@Param('id') assetId: string): Promise<UploadAssetDto> {
    return this.mintService.getAsset(assetId);
  }

  @Get('asset')
  async getAssets(
    @Query() query: UploadAssetQueryDto,
  ): Promise<UploadAssetDto[]> {
    return this.mintService.searchAsset(query);
  }

  @Post('upload_asset')
  async uploadAsset(@Body() asset: UploadAssetDto): Promise<UploadAssetDto> {
    return this.mintService.uploadAsset(asset);
  }

  @Post('upload_image/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(
    @Param('id') assetId: string,
    @Query('cover_img') coverImg: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<UploadAssetDto> {
    let orderdFiles = this.moveItemToIndexZero(coverImg, files);

    const uploadMedia = await this.cloudinaryService.uploadImages(
      orderdFiles,
      assetId,
    );
    const mediaURL = uploadMedia.map((x) => x.url);
    const coverURL = mediaURL.shift();
    return await this.mintService.updateAssetMediaURL(
      assetId,
      coverURL,
      mediaURL,
    );
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
  async mintAsset(@Param('id') assetId: string): Promise<MintAssetResDto> {
    return this.mintService.mintAsset(assetId);
  }

  private moveItemToIndexZero(
    id: string,
    list: Express.Multer.File[],
  ): Express.Multer.File[] {
    const index = list.findIndex((x) => x.originalname === id);

    if (index == -1) {
      throw new BadRequestException(`File with name "${id}" not found`);
    }

    if (index == 0) {
      return list;
    }

    const [item] = list.splice(index, 1);
    list.unshift(item);
    return list;
  }
}
