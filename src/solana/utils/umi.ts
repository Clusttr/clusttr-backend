import {
  createSignerFromKeypair,
  keypairIdentity,
  Umi,
} from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { web3JsEddsa } from '@metaplex-foundation/umi-eddsa-web3js';
import { web3JsRpc } from '@metaplex-foundation/umi-rpc-web3js';
import { fetchHttp } from '@metaplex-foundation/umi-http-fetch';
import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { Keypair } from '@solana/web3.js';
import { createBundlrUploader } from '@metaplex-foundation/umi-uploader-bundlr';

const rpc = 'https://api.devnet.solana.com';

export class UMIFactory {
  umi: Umi;
  constructor(private readonly keypair: Keypair) {
    const umi = createUmi(rpc)
      .use(web3JsEddsa())
      .use(web3JsRpc(rpc))
      .use(fetchHttp())
      .use(mplCandyMachine());

    const mKeypair = umi.eddsa.createKeypairFromSecretKey(keypair.secretKey);
    const signer = createSignerFromKeypair(umi, mKeypair);
    umi.use(keypairIdentity(signer));

    umi.uploader = createBundlrUploader(umi);

    this.umi = umi;
  }
}
