import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MintService } from './mint.service';
import { AssetDto } from './dto/asset.dto';

@ApiTags('mint')
@Controller('mint')
export class MintController {
  constructor(private readonly mintService: MintService) {}

  @Post('upload_asset')
  async uploadAsset(@Body() asset: AssetDto): Promise<string> {
    return this.mintService.uploadAsset(asset);
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
