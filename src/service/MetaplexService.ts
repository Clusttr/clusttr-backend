import * as bs58 from 'bs58';
import { percentAmount, createGenericFile } from '@metaplex-foundation/umi';
import {
  Creator,
  TokenStandard,
  createFungibleAsset,
  mintV1,
} from '@metaplex-foundation/mpl-token-metadata';
import { UploadAsset } from 'src/mint/schema/upload_asset.schema';
import { UMIFactory } from 'src/solana/utils/umi';
import {
  Umi,
  createSignerFromKeypair,
  publicKey,
  PublicKey,
} from '@metaplex-foundation/umi';
import { CloudinaryResource } from './media_manager/CloudinaryService';

class MetaplexServices {
  private umi: Umi;
  constructor(umiFactory: UMIFactory) {
    this.umi = umiFactory.umi;
  }

  async createToken(asset: UploadAsset, files: CloudinaryResource[]) {
    let uri = await this.upload(asset, files);
    let mint = createSignerFromString(asset.assetKey);
    let creators = this.getCreators(asset.developer);

    const tx = await createFungibleAsset(this.umi, {
      mint,
      authority: this.umi.payer,
      name: asset.name,
      symbol: asset.name,
      uri,
      isMutable: true,
      sellerFeeBasisPoints: percentAmount(2),
      creators,
    }).sendAndConfirm(this.umi);

    return tx.signature.toString();
  }

  async mintToken(
    assetPubkey: string,
    amount: number,
    destination: string,
  ): Promise<string> {
    let mintPubkey = publicKey(assetPubkey);
    let destinationPubkey = publicKey(destination);
    const tx = await mintV1(this.umi, {
      mint: mintPubkey,
      authority: this.umi.payer,
      amount: amount,
      tokenOwner: destinationPubkey,
      tokenStandard: TokenStandard.FungibleAsset,
    }).sendAndConfirm(this.umi);
    return tx.signature.toString();
  }

  async upload(
    asset: UploadAsset,
    cloudinaryFiles: CloudinaryResource[],
  ): Promise<string> {
    let filesURL = await this.uploadFiles(cloudinaryFiles);
    let jsonURL = await this.uploadJson(asset, cloudinaryFiles);
    return jsonURL;
  }

  private async uploadFiles(files: CloudinaryResource[]): Promise<string[]> {
    let gFiles = files.map((file) =>
      createGenericFile(file.filename, file.filename, {
        contentType: 'image/png',
      }),
    );
    let result = await this.umi.uploader.upload(gFiles);
    return result;
  }

  private async uploadJson(asset: UploadAsset, files: CloudinaryResource[]) {
    let filesOnIPSF = await this.uploadFiles(files);
    let coverImage = filesOnIPSF.shift();

    let attributes: Attribute[] = [
      { trait_type: 'bedrooms', value: asset.bedrooms.toString() },
      { trait_type: 'bathrooms', value: asset.bathrooms.toString() },
    ];

    let properties: Propety[] = asset.extraImages.map((mediaURI) => {
      return {
        file: {
          uri: mediaURI,
          type: 'image/png',
          cdn: false,
        },
        category: 'image',
      };
    });

    let metadata: SemiFungibleMetadeta = {
      name: asset.name,
      description: asset.description,
      image: coverImage,
      external_url: 'https://clusttr.io',
      attributes,
      properties,
    };

    const result = await this.umi.uploader.uploadJson(metadata);
    return result;
  }

  private getCreators(dev: string): Creator[] {
    return [
      {
        address: this.umi.payer.publicKey,
        verified: true,
        share: 100,
      },
      {
        address: publicKey(dev),
        verified: false,
        share: 0,
      },
    ];
  }
}

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

interface SemiFungibleMetadeta {
  name: string;
  description: string;
  image: string;
  animation_url?: string;
  external_url: string;
  attributes: Attribute[];
  properties: Propety[];
}

function createSemiFungibleMetadata(asset: UploadAsset): SemiFungibleMetadeta {
  let attributes: Attribute[] = [
    { trait_type: 'bedrooms', value: asset.bedrooms.toString() },
    { trait_type: 'bathrooms', value: asset.bathrooms.toString() },
  ];

  // fetch these media from cloudinary first before
  let properties: Propety[] = asset.extraImages.map((mediaURI) => {
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
    image: asset.displayImage,
    external_url: 'https://clusttr.io',
    attributes,
    properties,
  };
}

function createSignerFromString(secretKey: string) {
  const secretKeyBits = bs58.decode(secretKey);
  const keypair = this.umi.eddsa.createKeypairFromSecretKey(secretKeyBits);
  const keypairSigner = createSignerFromKeypair(this.umi, keypair);
  return keypairSigner;
}
