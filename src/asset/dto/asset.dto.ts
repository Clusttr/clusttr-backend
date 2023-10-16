import { AssetModel, Item } from "../models/Asset.model"

export class AssetDto {
    readonly id: string
    readonly uri: string
    readonly attribute: AttributesDto[]
    readonly description: string
    readonly name: string
    readonly symbol: string
    readonly image: string
    readonly supply: number
    readonly maxSupply: number
    readonly files: File[]
}

class AttributesDto {
    readonly value: string
    readonly traitType: string
}

class File {
    uri: string;
    mime: string;
}

export function createAssetDto(assets: Item[]): AssetDto[] {
    return assets.map((item) => ({
        id: item.id,
        uri: item.content.json_uri,
        attribute: item.content.metadata.attributes === undefined ? [] : item.content.metadata.attributes.map((att) => ({
          value: att.value,
          traitType: att.trait_type,
        })),
        description: item.content.metadata.description,
        name: item.content.metadata.name,
        symbol: item.content.metadata.symbol,
        image: item.content.links.image,
        files: item.content.files,
        supply: item.supply.print_current_supply,
        maxSupply: item.supply.print_max_supply,
      }));
}
