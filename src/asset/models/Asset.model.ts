export interface AssetModel {
  jsonrpc: string;
  result: Result;
  id: string;
}

export interface Result {
  total: number;
  limit: number;
  page: number;
  items: Item[];
}

export interface Item {
  interface: string;
  id: string;
  content: Content;
  // authorities: Authority[];
  // compression: Compression;
  // grouping:    any[];
  // royalty:     Royalty;
  // creators:    Creator[];
  // ownership:   Ownership;
  supply: Supply;
  mutable: boolean;
  burnt: boolean;
}

export interface Content {
  $schema: string;
  json_uri: string;
  files: File[];
  metadata: Metadata;
  links: Links;
}

export interface File {
  uri: string;
  cdn_uri?: string;
  mime: string;
}

export interface Links {
  image: string;
  external_url: string;
}

export interface Metadata {
  attributes: Attribute[];
  description: string;
  name: string;
  symbol: string;
  token_standard: string;
}

export interface Attribute {
  value: string;
  trait_type: string;
}

export interface Supply {
  print_max_supply: number;
  print_current_supply: number;
  edition_nonce: null;
}
