import { percentAmount, GenericFile } from '@metaplex-foundation/umi';
import {
  Creator,
  TokenStandard,
  createFungibleAsset,
  mintV1,
} from '@metaplex-foundation/mpl-token-metadata';
import { UploadAsset } from 'src/mint/schema/upload_asset.schema';
import { createSignerFromString, UMIFactory } from 'src/solana/utils/umi';
import { publicKey } from '@metaplex-foundation/umi';
import { createSemiFungibleMetadata } from './types/SemiFungibleMetadeta';
import {
  CloudinaryResource,
  generateGenericFile,
} from './types/CloudinaryResource';

export class MetaplexServices {
  constructor(private readonly umiFactory: UMIFactory) {}

  async createToken(asset: UploadAsset, files: CloudinaryResource[]) {
    let uri = await this.upload(asset, files);
    let mint = createSignerFromString(asset.assetKey);
    let creators = this.getCreators(asset.developer);

    const tx = await createFungibleAsset(this.umiFactory.umi, {
      mint,
      authority: this.umiFactory.umi.payer,
      name: asset.name,
      symbol: asset.name,
      uri,
      isMutable: true,
      sellerFeeBasisPoints: percentAmount(2),
      creators,
    }).sendAndConfirm(this.umiFactory.umi);

    return tx.signature.toString();
  }

  async mintToken(
    assetPubkey: string,
    amount: number,
    destination: string,
  ): Promise<string> {
    let mintPubkey = publicKey(assetPubkey);
    let destinationPubkey = publicKey(destination);
    const tx = await mintV1(this.umiFactory.umi, {
      mint: mintPubkey,
      authority: this.umiFactory.umi.payer,
      amount: amount,
      tokenOwner: destinationPubkey,
      tokenStandard: TokenStandard.FungibleAsset,
    }).sendAndConfirm(this.umiFactory.umi);
    return tx.signature.toString();
  }

  async upload(
    asset: UploadAsset,
    cloudinaryFiles: CloudinaryResource[],
  ): Promise<string> {
    let files = await generateGenericFile(cloudinaryFiles);
    let filesURL = await this.umiFactory.umi.uploader.upload(files);
    let coverImage = filesURL.shift(); //coverImage is first item on the list

    let jsonMetadata = createSemiFungibleMetadata(asset, coverImage, filesURL);
    let jsonURL = await this.umiFactory.umi.uploader.uploadJson(jsonMetadata);

    return jsonURL;
  }

  private getCreators(dev: string): Creator[] {
    return [
      {
        address: this.umiFactory.umi.payer.publicKey,
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
