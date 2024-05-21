import { Content, Error } from './Assets.model';

export interface AssetModel {
  jsonrpc: string;
  result: Result;
  id: string;
  error?: Error;
}

export interface Result {
  interface: string;
  id: string;
  content: Content;
  // authorities: Authority[];
  // compression: Compression;
  // grouping:    any[];
  // royalty:     Royalty;
  // creators:    Creator[];
  // ownership:   Ownership;
  supply?: number; //Supply;
  mutable: boolean;
  burnt: boolean;
}
