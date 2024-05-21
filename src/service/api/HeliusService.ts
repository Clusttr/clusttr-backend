import { AssetsModel } from 'src/asset/models/Assets.model';
import { makePostRequest } from './make-post-request';
import { BatchAssetModel } from 'src/asset/models/BatchAssetModel';
import { AssetModel } from 'src/asset/models/Asset.model';

export class HeliusService {
  constructor(private readonly apiKey: string) {}

  async fetchAssets(
    creator: string,
    page: number,
    limit: number,
  ): Promise<AssetsModel> {
    const requestBody = {
      jsonrpc: '2.0',
      id: '',
      method: 'getAssetsByCreator',
      params: {
        creatorAddress: creator,
        onlyVerified: false,
        page,
        limit,
      },
    };

    const assetModel = await makePostRequest<AssetsModel>(
      this.apiKey,
      requestBody,
    );
    return assetModel;
  }

  async fetchAsset(id: string): Promise<AssetModel> {
    const requestBody = {
      jsonrpc: '2.0',
      id: '',
      method: 'getAsset',
      params: {
        id,
      },
    };

    const assetModel = await makePostRequest<AssetModel>(
      this.apiKey,
      requestBody,
    );
    return assetModel;
  }

  async fetchAssetBatch(ids: string[]): Promise<BatchAssetModel> {
    const requestBody = {
      jsonrpc: '2.0',
      id: '',
      method: 'getAssetBatch',
      params: {
        ids,
      },
    };

    const assetModels = await makePostRequest<BatchAssetModel>(
      this.apiKey,
      requestBody,
    );
    return assetModels;
  }
}
