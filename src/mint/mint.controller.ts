import {
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
  ): Promise<string> {
    await this.cloudinaryService.uploadImages(files, assetId);
    return 'should work';
  }

  @Post('update_asset')
  async addMoreInfo(): Promise<string> {
    return this.mintService.addMoreInfo();
  }

  @Post('create_asset')
  async createAsset(): Promise<string> {
    return this.mintService.createAndMintAsset();
  }
}
