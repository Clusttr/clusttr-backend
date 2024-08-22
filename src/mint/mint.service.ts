import { Injectable } from '@nestjs/common';
import { AssetDto } from './dto/asset.dto';

@Injectable()
export class MintService {
  constructor() {} //(@InjectModel(MintService.name) private mintModel: MintModule) {}

  async uploadAsset(asset: AssetDto): Promise<string> {
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
