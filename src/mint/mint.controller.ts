import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MintService } from './mint.service';
import { UploadAssetDto } from './dto/upload_asset.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('mint')
@Controller('mint')
export class MintController {
  constructor(private readonly mintService: MintService) {}

  @Post('upload_asset')
  async uploadAsset(@Body() asset: UploadAssetDto): Promise<string> {
    return this.mintService.uploadAsset(asset);
  }

  @Post('upload_image')
  @UseInterceptors(FilesInterceptor('files'))
  async upload_files(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Query('cover_img') cover_img: string,
  ): Promise<string> {
    console.log({ files });
    console.log({ cover_img });
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
