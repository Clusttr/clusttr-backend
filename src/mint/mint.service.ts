import { Injectable } from '@nestjs/common';
import { UploadAssetDto } from './dto/upload_asset.dto';
import * as fs from 'fs';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class MintService {
  constructor() {}

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
