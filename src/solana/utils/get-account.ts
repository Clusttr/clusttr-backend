import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

export const generateAccount = (secretKey: string) => {
    const data = isHexadecimal(secretKey) ? Uint8Array.from(Buffer.from(secretKey, 'hex')) : bs58.decode(secretKey)
    return Keypair.fromSecretKey(data)
};

function isHexadecimal(input: string): boolean {
  const hexRegex = /^[0-9A-Fa-f]+$/;
  return hexRegex.test(input);
}