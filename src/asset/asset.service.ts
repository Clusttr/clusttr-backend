import { BadRequestException, Injectable } from '@nestjs/common';
import {} from './dto/creat-asset-instruction.dto';
import {
  createFungibleAsset,
  printSupply,
  mintV1,
  TokenStandard,
  fetchDigitalAssetByMetadata,
  Creator
} from '@metaplex-foundation/mpl-token-metadata';
import { UMIFactory } from 'src/solana/utils/umi';
import {
  generateSigner,
  percentAmount,
  publicKey,
  PublicKey,
  Option,
} from '@metaplex-foundation/umi';
import { MintInstructionDto, CreateAssetInstructionDto } from './dto';
import base58 from 'bs58';
const bs58 = require('bs58');

@Injectable()
export class AssetService {
  constructor(private readonly umiFactory: UMIFactory) {}

  async create(asset: CreateAssetInstructionDto): Promise<string> {
    let umi = this.umiFactory.umi;
    const mint = generateSigner(umi);
    const transaction = await createFungibleAsset(umi, {
      mint,
      ...asset,
      isMutable: true,
      sellerFeeBasisPoints: percentAmount(1.5),
      creators: [
        { address: umi.payer.publicKey, verified: true, share: 100 },
        { address: publicKey(asset.creator), verified: true, share: 0 },
      ],
      printSupply: printSupply('Limited', [asset.maxSupply]),
    }).sendAndConfirm(umi);
    console.log({ transaction: bs58.encode(transaction.signature) });
    return;
  }

  async mint(asset: MintInstructionDto): Promise<string> {
    const umi = this.umiFactory.umi;

    const mint = publicKey(asset.assetAddress);
    const receiverAddres = publicKey(asset.receiverAddress);
    try {
      const tx = await mintV1(umi, {
        mint,
        authority: umi.payer,
        amount: asset.amount,
        tokenOwner: receiverAddres,
        tokenStandard: TokenStandard.FungibleAsset,
      }).sendAndConfirm(umi);
      const txString = base58.encode(tx.signature);
      return txString;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async isACreator(mint: PublicKey) {
    const creators: Option<Array<Creator>> = await this.fetchCreators(mint)
    
  }

  async fetchCreators(mint: PublicKey) {
    const umi = this.umiFactory.umi;
    const asset = await fetchDigitalAssetByMetadata(umi, mint)
    const creators = asset.metadata.creators
    return creators
  }
}
