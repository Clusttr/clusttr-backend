import { AssetModel } from 'src/asset/models/Asset.model';
import { makePostRequest } from './make-post-request';
import { BatchAssetModel } from 'src/asset/models/BatchAssetModel';

export class HeliusService {
  constructor(private readonly apiKey: string) {}

  async fetchAssets(
    creator: string,
    page: number,
    limit: number,
  ): Promise<AssetModel> {
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

    const assetModel = await makePostRequest<BatchAssetModel>(
      this.apiKey,
      requestBody,
    );
    return assetModel;
  }
}
