import { AssetModel } from '../models/Asset.model';
import { AssetsModel, Item } from '../models/Assets.model';

export class AssetDto {
  readonly id: string;
  readonly uri: string;
  readonly attribute: AttributesDto[];
  readonly description: string;
  readonly name: string;
  readonly symbol: string;
  readonly image: string;
  readonly supply: number;
  readonly maxSupply: number;
  readonly files: File[];
}

class AttributesDto {
  readonly value: string;
  readonly traitType: string;
}

class File {
  uri: string;
  mime: string;
}

export function createAssetDto(assetModel: AssetModel): AssetDto {
  const asset = assetModel.result;
  return {
    id: asset.id,
    uri: asset.content.json_uri,
    attribute:
      asset.content.metadata.attributes === undefined
        ? []
        : asset.content.metadata.attributes.map((att) => ({
            value: att.value,
            traitType: att.trait_type,
          })),
    description: asset.content.metadata.description,
    name: asset.content.metadata.name,
    symbol: asset.content.metadata.symbol,
    image: asset.content.links.image,
    files: asset.content.files,
    supply: asset.supply ?? 0,
    maxSupply: 0,
  };
}

export function createAssetDtos(assets: Item[]): AssetDto[] {
  return assets.map((item) => ({
    id: item.id,
    uri: item.content.json_uri,
    attribute:
      item.content.metadata.attributes === undefined
        ? []
        : item.content.metadata.attributes.map((att) => ({
            value: att.value,
            traitType: att.trait_type,
          })),
    description: item.content.metadata.description,
    name: item.content.metadata.name,
    symbol: item.content.metadata.symbol,
    image: item.content.links.image,
    files: item.content.files,
    supply: item.supply ?? 0, // item.supply?.print_current_supply ?? 0,
    maxSupply: 0, //item.supply?.print_max_supply ?? 0,
  }));
}
