import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MintService } from './mint.service';

@ApiTags('mint')
@Controller('mint')
export class MintController {
  constructor(private readonly mintService: MintService) {}

  @Post('upload asset')
  async uploadAsset(): Promise<string> {
    return this.mintService.uploadAsset();
  }

  @Post('add_more_info')
  async addMoreInfo(): Promise<string> {
    return this.mintService.addMoreInfo();
  }

  @Post('create_asset')
  async createAsset(): Promise<string> {
    return this.mintService.createAsset();
  }

  @Post('mint_asset')
  async mintAsset(): Promise<string> {
    return this.mintService.mintAsset();
  }
}
