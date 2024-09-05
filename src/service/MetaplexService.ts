import * as bs58 from 'bs58';
import {
  percentAmount,
  createGenericFile,
  GenericFile,
} from '@metaplex-foundation/umi';
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
} from '@metaplex-foundation/umi';
import { createSemiFungibleMetadata } from './types/SemiFungibleMetadeta';
import {
  CloudinaryResource,
  generateGenericFile,
} from './types/CloudinaryResource';

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
    let files = await generateGenericFile(cloudinaryFiles);
    let filesURL = await this.uploadFiles(files);
    let coverImage = filesURL.shift();
    let jsonURL = await this.uploadJson(asset, coverImage, filesURL);
    return jsonURL;
  }

  private async uploadFiles(files: GenericFile[]): Promise<string[]> {
    let result = await this.umi.uploader.upload(files);
    return result;
  }

  private async uploadJson(
    asset: UploadAsset,
    coverImage: string,
    extraImages: string[],
  ) {
    let metadata = createSemiFungibleMetadata(asset, coverImage, extraImages);
    return await this.umi.uploader.uploadJson(metadata);
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

function createSignerFromString(secretKey: string) {
  const secretKeyBits = bs58.decode(secretKey);
  const keypair = this.umi.eddsa.createKeypairFromSecretKey(secretKeyBits);
  const keypairSigner = createSignerFromKeypair(this.umi, keypair);
  return keypairSigner;
}
