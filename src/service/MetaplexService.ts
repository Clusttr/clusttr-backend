import { percentAmount, GenericFile } from '@metaplex-foundation/umi';
import {
  Creator,
  TokenStandard,
  createFungibleAsset,
  mintV1,
  printSupply,
} from '@metaplex-foundation/mpl-token-metadata';
import { UploadAsset } from 'src/mint/schema/upload_asset.schema';
import { UMIFactory } from 'src/solana/utils/umi';
import { publicKey } from '@metaplex-foundation/umi';
import { createSemiFungibleMetadata } from './types/SemiFungibleMetadeta';
import {
  CloudinaryResource,
  generateGenericFile,
} from './types/CloudinaryResource';
import bs58 from 'bs58';
import { createSignerFromKeypair } from '@metaplex-foundation/umi';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MetaplexServices {
  constructor(private readonly umiFactory: UMIFactory) {}

  async createToken(
    asset: UploadAsset,
    assetSecret: string,
    files: CloudinaryResource[],
  ) {
    let uri = await this.upload(asset, files);
    let mint = this.createSignerFromString(assetSecret);
    let creators = this.getCreators(
      '9831HW6Ljt8knNaN6r6JEzyiey939A2me3JsdMymmz5J',
    ); //(asset.developer);

    const tx = await createFungibleAsset(this.umiFactory.umi, {
      mint,
      authority: this.umiFactory.umi.payer,
      name: asset.name,
      symbol: 'CHH1',
      uri,
      isMutable: true,
      sellerFeeBasisPoints: percentAmount(2),
      creators,
      printSupply: printSupply('Limited', [1000]),
    }).sendAndConfirm(this.umiFactory.umi);

    return bs58.encode(tx.signature);
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
    return bs58.encode(tx.signature);
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

    console.log({ jsonURL });
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

  createSignerFromString(secretKey: string) {
    const umi = this.umiFactory.umi;
    const secretKeyBits = bs58.decode(secretKey);
    const keypair = umi.eddsa.createKeypairFromSecretKey(secretKeyBits);
    const keypairSigner = createSignerFromKeypair(umi, keypair);
    return keypairSigner;
  }
}
