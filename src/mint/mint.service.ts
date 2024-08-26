import { BadRequestException, Injectable } from '@nestjs/common';
import { createUploadAsset, UploadAssetDto } from './dto/upload_asset.dto';
import * as fs from 'fs';
import { resolve } from 'path';
import { rejects } from 'assert';
import { InjectModel } from '@nestjs/mongoose';
import { UploadAsset } from './schema/upload_asset.schema';
import { Model } from 'mongoose';

@Injectable()
export class MintService {
  constructor(
    @InjectModel(UploadAsset.name) private uploadAssetModel: Model<UploadAsset>,
  ) {}

  async uploadAsset(asset: UploadAssetDto): Promise<UploadAssetDto> {
    try {
      const result = await this.uploadAssetModel.findOneAndUpdate(
        { assetKey: asset.assetKey },
        asset,
        { upsert: true },
      );
      return createUploadAsset(result);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async addMoreInfo(): Promise<string> {
    return 'add more info';
  }

  async createAndMintAsset(): Promise<string> {
    return 'create asset';
  }
}
