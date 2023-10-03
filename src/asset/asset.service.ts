import { Injectable } from '@nestjs/common';
import { AssetDto } from './dto/creat-asset.dto';
import { createFungibleAsset } from '@metaplex-foundation/mpl-token-metadata';
import { UMIFactory } from 'src/solana/utils/umi';
import { generateSigner, percentAmount } from "@metaplex-foundation/umi";
const bs58 = require('bs58')

@Injectable()
export class AssetService {
    constructor(private readonly umiFactory: UMIFactory) {}

  async create(asset: AssetDto): Promise<string> {
    const { name, symbol } = asset
    let umi = this.umiFactory.umi
    const mint = generateSigner(umi)
    const transaction = await createFungibleAsset(umi, {
        mint,
        ...asset,
        isMutable: true,
        sellerFeeBasisPoints: percentAmount(1.5)
    }).sendAndConfirm(umi)
    console.log({transaction: bs58.encode(transaction.signature)})
    return 
  }
}
