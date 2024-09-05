import { UploadAsset } from 'src/mint/schema/upload_asset.schema';

type Attribute = {
  trait_type: string;
  value: string;
};

type Propety = {
  file: {
    uri: string;
    type: string;
    cdn: boolean;
  };
  category: 'video' | 'image';
};

export interface SemiFungibleMetadeta {
  name: string;
  description: string;
  image: string;
  animation_url?: string;
  external_url: string;
  attributes: Attribute[];
  properties: Propety[];
}

export function createSemiFungibleMetadata(
  asset: UploadAsset,
  coverImage: string,
  files: string[],
): SemiFungibleMetadeta {
  let attributes: Attribute[] = [
    { trait_type: 'bedrooms', value: asset.bedrooms.toString() },
    { trait_type: 'bathrooms', value: asset.bathrooms.toString() },
  ];

  let properties: Propety[] = files.map((mediaURI) => {
    return {
      file: {
        uri: mediaURI,
        type: 'image/png',
        cdn: false,
      },
      category: 'image',
    };
  });

  return {
    name: asset.name,
    description: asset.description,
    image: coverImage,
    external_url: 'https://clusttr.io',
    attributes,
    properties,
  };
}
