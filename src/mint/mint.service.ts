import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UploadAssetDtoReq } from './dto/upload_asset_req.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UploadAsset } from './schema/upload_asset.schema';
import { Model } from 'mongoose';
import { UploadAssetQueryDto } from './dto/upload_asset_query.dto';
import { CloudinaryService } from 'src/service/media_manager/CloudinaryService';
import { MetaplexServices } from 'src/service/MetaplexService';
import { CreateAssetResDto } from 'src/asset/dto/create-asset-res.dto';
import { MintAssetResDto } from './dto/mint_asset_res.dto';
import { MintAssetReqDto } from './dto/mint_asset_req.dto';
import { createSignerFromString } from 'src/solana/utils/umi';
import {
  createUploadAssetRes,
  UploadAssetDtoRes,
} from './dto/upload_asset_res.dto';

@Injectable()
export class MintService {
  constructor(
    @InjectModel(UploadAsset.name) private uploadAssetModel: Model<UploadAsset>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly metaplexService: MetaplexServices,
  ) {}

  async getAsset(assetId: string): Promise<UploadAssetDtoRes> {
    try {
      const asset = await this.uploadAssetModel.findById(assetId);
      if (!asset) {
        throw new NotFoundException();
      }
      return createUploadAssetRes(asset);
    } catch (error) {
      throw error;
    }
  }

  async searchAsset(query: UploadAssetQueryDto): Promise<UploadAssetDtoRes[]> {
    try {
      let assets = await this.uploadAssetModel.find({ ...query });
      return assets.map((x) => createUploadAssetRes(x));
    } catch (error) {
      throw error;
    }
  }

  async uploadAsset(asset: UploadAssetDtoReq): Promise<UploadAssetDtoReq> {
    try {
      const result = await this.uploadAssetModel.findOneAndUpdate(
        { mintKey: asset.assetKey },
        asset,
        { upsert: true },
      );

      const updatedAsset = await this.uploadAssetModel.findById(result.id);
      return createUploadAssetRes(updatedAsset);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateAssetMediaURL(
    id: string,
    coverImg: string,
    files: Array<Express.Multer.File>,
  ): Promise<UploadAssetDtoRes> {
    try {
      let orderdFiles = this.moveItemToIndexZero(coverImg, files);
      const asset = await this.uploadAssetModel.findById(id);
      if (!asset) {
        throw new NotFoundException(`Asset of id: ${id} not found`);
      }

      const uploadMedia = await this.cloudinaryService.uploadImages(
        orderdFiles,
        asset.mintKey,
      );
      const mediaURL = uploadMedia.map((x) => x.url);
      const coverURL = mediaURL.shift();

      const result = await this.uploadAssetModel.findByIdAndUpdate(id, {
        coverImage: coverURL,
      });
      const updatedAsset = await this.uploadAssetModel.findById(result.id);
      return createUploadAssetRes(updatedAsset);
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
    let files = await this.cloudinaryService.fetchImages(asset.mintKey);
    let txSig = await this.metaplexService.createToken(asset, files);
    //delete asset from cloudinary
    let filesKey = files.map((x) => x.asset_id);
    await this.cloudinaryService.deleteFolder(asset.mintKey, filesKey);
    //delete asset from db
    await this.uploadAssetModel.findByIdAndDelete(assetId);
    return { token: asset.mintKey, txSig };
  }

  async mintAsset(id: string, req: MintAssetReqDto): Promise<MintAssetResDto> {
    let asset = await this.uploadAssetModel.findById(id);
    if (!asset) {
      throw new BadRequestException(
        "Asset can't be found; may have been minted",
      );
    }
    let keypair = createSignerFromString(req.privateKey);
    if (asset.mintKey !== keypair.publicKey) {
      throw new BadRequestException(
        "Secret key not valid for asset, can't mint",
      );
    }
    let txSig = await this.metaplexService.mintToken(
      req.privateKey,
      1_000,
      asset.developer,
    );
    return { token: asset.mintKey, txSig };
  }

  private moveItemToIndexZero(
    id: string,
    list: Express.Multer.File[],
  ): Express.Multer.File[] {
    const index = list.findIndex((x) => x.originalname === id);

    if (index == -1) {
      throw new BadRequestException(`File with name "${id}" not found`);
    }

    if (index == 0) {
      return list;
    }

    const [item] = list.splice(index, 1);
    list.unshift(item);
    return list;
  }
}
