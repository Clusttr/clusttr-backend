import { Keypair } from "@solana/web3.js"
const bs58 = require('bs58')


export const generateAccount = (secretKey: string) => {
    return Keypair.fromSecretKey(bs58.decode(secretKey))
}