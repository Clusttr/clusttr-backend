import { Item } from "./Asset.model";

export interface BatchAssetModel {
    jsonrpc: string;
    result: Item[];
    id: string;
  }