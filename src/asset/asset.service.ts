import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {} from './dto/creat-asset-instruction.dto';
import {
  createFungibleAsset,
  printSupply,
  mintV1,
  TokenStandard,
  fetchDigitalAssetByMetadata,
  transferV1,
  delegateStandardV1,
} from '@metaplex-foundation/mpl-token-metadata';
import { UMIFactory } from 'src/solana/utils/umi';
import {
  generateSigner,
  percentAmount,
  publicKey,
  PublicKey,
  createSignerFromKeypair
} from '@metaplex-foundation/umi';
import { Pda as P } from '@metaplex-foundation/js'
import { MintInstructionDto, CreateAssetInstructionDto } from './dto';
import base58 from 'bs58';
import { User } from 'src/user/schemas/user.schemas';
import { getCreators } from 'src/utils/creator';
import { Keypair } from '@solana/web3.js';
import { BuyAssetInstruction } from './dto/buy-asset-instruction.dto';
import { generateAccount, generateHexAccount } from 'src/solana/utils/get-account';
const bs58 = require('bs58');

@Injectable()
export class AssetService {
  constructor(
    private readonly umiFactory: UMIFactory,
    private readonly payer: Keypair,
  ) {}

  async create(user: User, asset: CreateAssetInstructionDto): Promise<string> {
    let umi = this.umiFactory.umi;
    const mint = generateSigner(umi);
    const transaction = await createFungibleAsset(umi, {
      mint,
      ...asset,
      isMutable: true,
      sellerFeeBasisPoints: percentAmount(1.5),
      creators: [
        { address: umi.payer.publicKey, verified: true, share: 100 },
        { address: publicKey(user.publicKey), verified: true, share: 0 },
      ],
      printSupply: printSupply('Limited', [asset.maxSupply]),
    }).sendAndConfirm(umi);
    console.log({ transaction: bs58.encode(transaction.signature) });
    return;
  }

  async mint(user: User, asset: MintInstructionDto): Promise<string> {
    const umi = this.umiFactory.umi;
    const mint = publicKey(asset.assetAddress);

    // if (!this.isACreator(mint, publicKey(user.publicKey))) {
    //   throw new UnauthorizedException(
    //     'Only the creator of this asset can mint it',
    //   );
    // }

    try {
      const tx = await mintV1(umi, {
        mint,
        authority: umi.payer,
        amount: asset.amount,
        tokenOwner: publicKey(user.publicKey),
        tokenStandard: TokenStandard.FungibleAsset,
      }).sendAndConfirm(umi);

      //give admin mint authority
      this.giveAdminTransferAuthority(asset.privateKey, asset.assetAddress)
      const txString = base58.encode(tx.signature);
      return txString;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  private async giveAdminTransferAuthority(privateKey: string, mintAddress: string) {
    const umi = this.umiFactory.umi
    const mint = publicKey(mintAddress)
    const keypair = generateHexAccount(privateKey)
    const signer = umi.eddsa.createKeypairFromSecretKey(keypair.secretKey)
    const authority = createSignerFromKeypair(umi, signer)
    const delegate = publicKey(this.payer.publicKey.toBase58())

    const tx = await delegateStandardV1(umi, {
      mint,
      tokenOwner: authority.publicKey,
      authority,
      delegate,
      tokenStandard: TokenStandard.FungibleAsset,
      amount: 1000
    }).sendAndConfirm(umi)
  }

  private async isACreator(mint: PublicKey, creatorPublicKey: PublicKey) {
    const creators = getCreators(await this.fetchCreators(mint));
    const creator = creators.find((val) => val.address === creatorPublicKey);
    if (creator) {
      return true;
    } else {
      return false;
    }
  }

  private async fetchCreators(mint: PublicKey) {
    const umi = this.umiFactory.umi;
    const asset = await fetchDigitalAssetByMetadata(umi, mint);
    const creators = asset.metadata.creators;
    return creators;
  }

  //buy asset
  async buyAsset(instruction: BuyAssetInstruction) {
    //calculate royalty
    //transfer royalty to us
    //transfer money to asset owners
    //transfer asset to buyer

    //fetchAsset and check royalty
    try {
      const umi = this.umiFactory.umi;
      const buyerAccount = generateAccount(instruction.buyerPrivateKey)
      const keypair = umi.eddsa.createKeypairFromSecretKey(buyerAccount.secretKey)
      const signer = createSignerFromKeypair(umi, keypair);
      const buyerPublicKey = publicKey(buyerAccount.publicKey)
      const mint = publicKey(instruction.tokenAddress);
      const asset = await fetchDigitalAssetByMetadata(umi, mint);
      // const destinationAddress: Pda = P.find(x)

      //roalty
      const numbOfTokens = instruction.amount;
      const costPerUnitToken = await this.getAssetPrice(instruction.tokenAddress);
      const costOfAllToken = numbOfTokens * costPerUnitToken;

      const royalty = (
        await this.getCreator(publicKey(this.payer.publicKey), mint)
      ).share;
      const royaltyFee = (costOfAllToken * royalty) / 100;

      const totalConst = costOfAllToken + royaltyFee;
      const userBalance = await this.getUserBalance(buyerPublicKey);

      if (totalConst > userBalance) {
        throw new ForbiddenException('Insufficient balance');
      }

      //create instructions
      await transferV1(umi, {
        mint,
        authority: signer,
        tokenOwner: buyerPublicKey,
        destinationOwner: signer.publicKey, //destinationAddress, //this.payer.publicKey,
        tokenStandard: TokenStandard.Fungible
      }).sendAndConfirm(umi)
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  private async getCreator(creatorPublicKey: PublicKey, mint: PublicKey) {
    const creators = getCreators(await this.fetchCreators(mint));
    const creator = creators.find((val) => val.address === creatorPublicKey);
    return creator;
  }

  private async getUserBalance(account: PublicKey): Promise<number> {
    return 0;
  }

  private async getAssetPrice(asset: string): Promise<number> {
    return 0;
  }
}
