import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createUploadAsset, UploadAssetDto } from './dto/upload_asset.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UploadAsset } from './schema/upload_asset.schema';
import { Model } from 'mongoose';
import { UploadAssetQueryDto } from './dto/upload_asset_query.dto';
import { CloudinaryService } from 'src/service/media_manager/CloudinaryService';
import { MetaplexServices } from 'src/service/MetaplexService';
import { CreateAssetResDto } from 'src/asset/dto/create-asset-res.dto';

@Injectable()
export class MintService {
  constructor(
    @InjectModel(UploadAsset.name) private uploadAssetModel: Model<UploadAsset>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly metaplexService: MetaplexServices,
  ) {}

  async getAsset(assetId: string): Promise<UploadAssetDto> {
    try {
      const asset = await this.uploadAssetModel.findById(assetId);
      if (!asset) {
        throw new NotFoundException();
      }
      return createUploadAsset(asset);
    } catch (error) {
      throw error;
    }
  }

  async searchAsset(query: UploadAssetQueryDto): Promise<UploadAssetDto[]> {
    try {
      let assets = await this.uploadAssetModel.find({ ...query });
      return assets.map((x) => createUploadAsset(x));
    } catch (error) {
      throw error;
    }
  }

  async uploadAsset(asset: UploadAssetDto): Promise<UploadAssetDto> {
    try {
      const result = await this.uploadAssetModel.findOneAndUpdate(
        { assetKey: asset.assetKey },
        asset,
        { upsert: true },
      );

      const updatedAsset = await this.uploadAssetModel.findById(result.id);
      return createUploadAsset(updatedAsset);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateAssetMediaURL(
    id: string,
    displayImage: string,
    extraImages: string[],
  ): Promise<UploadAssetDto> {
    try {
      const result = await this.uploadAssetModel.findByIdAndUpdate(id, {
        displayImage,
        extraImages,
      });
      const updateAsset = await this.uploadAssetModel.findById(result.id);
      return createUploadAsset(updateAsset);
    } catch (error) {
      throw error;
    }
  }

  async addMoreInfo(): Promise<string> {
    return 'add more info';
  }

  async createAsset(assetId: string): Promise<CreateAssetResDto> {
    //fetch asset
    let asset = await this.uploadAssetModel.findById(assetId);
    //fetch asset media to arweave
    let files = await this.cloudinaryService.fetchImages(asset.assetKey);
    let txSig = await this.metaplexService.createToken(asset, files);
    //delete asset from cloudinary
    let filesKey = files.map((x) => x.asset_id);
    await this.cloudinaryService.deleteFolder(asset.assetKey, filesKey);
    //delete asset from db
    await this.uploadAssetModel.findByIdAndDelete(assetId);
    return { token: asset.assetKey, txSig: txSig };
  }
}
