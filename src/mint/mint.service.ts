import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MintModule } from './mint.module';

@Injectable()
export class MintService {
  constructor() {} //(@InjectModel(MintService.name) private mintModel: MintModule) {}

  async uploadAsset(): Promise<string> {
    return 'uploading';
  }

  async addMoreInfo(): Promise<string> {
    return 'add more info';
  }

  async createAsset(): Promise<string> {
    return 'create asset';
  }

  async mintAsset(): Promise<string> {
    return 'mint_asset';
  }
}
