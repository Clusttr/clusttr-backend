import { Injectable, ConflictException } from '@nestjs/common';
import {
  Connection,
  Keypair,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
  clusterApiUrl,
} from '@solana/web3.js';

@Injectable()
export class AccountService {
  constructor(private payer: Keypair) {}

  /**
   * @deprecated This function has been replace with a
   * program function that can be signed from client-side
   * @param keyPair
   * @returns 
   */
  async registerAccount(keyPair: Keypair): Promise<string> {
    const space = 0;
    const connection = new Connection(clusterApiUrl("devnet"), "single")
    const lamports = await connection.getMinimumBalanceForRentExemption(
      space,
    );

    const createTransactionIx = SystemProgram.createAccount({
      fromPubkey: this.payer.publicKey,
      newAccountPubkey: keyPair.publicKey,
      lamports,
      space,
      programId: SystemProgram.programId,
    });

    const recentBlockhash = await connection
      .getLatestBlockhash()
      .then((res) => res.blockhash);

    const message = new TransactionMessage({
      payerKey: this.payer.publicKey,
      recentBlockhash: recentBlockhash,
      instructions: [createTransactionIx],
    }).compileToV0Message();

    const transaction = new VersionedTransaction(message);
    transaction.sign([this.payer, keyPair]);

    const signature = await connection
      .sendTransaction(transaction)
      .catch((_) => {
        throw new ConflictException('Account have already been registered'); 
      });

    return signature;
  }
}
