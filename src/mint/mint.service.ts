import { Injectable } from '@nestjs/common';
import { UploadAssetDto } from './dto/upload_asset.dto';

@Injectable()
export class MintService {
  constructor() {} //(@InjectModel(MintService.name) private mintModel: MintModule) {}

  async uploadAsset(asset: UploadAssetDto): Promise<string> {
    console.log({ asset });
    return 'uploading';
  }

  async addMoreInfo(): Promise<string> {
    return 'add more info';
  }

  async createAndMintAsset(): Promise<string> {
    return 'create asset';
  }
}
