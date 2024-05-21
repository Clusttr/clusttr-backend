import { Item } from './Assets.model';

export interface BatchAssetModel {
  jsonrpc: string;
  result: Item[];
  id: string;
}
