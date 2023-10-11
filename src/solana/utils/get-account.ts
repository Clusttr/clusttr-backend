import { Keypair } from "@solana/web3.js"
const bs58 = require('bs58')


export const generateAccount = (secretKey: string) => {
    return Keypair.fromSecretKey(bs58.decode(secretKey))
}

export const generateHexAccount = (secretKey: string) => {
    const secretKeyBinary = Uint8Array.from(Buffer.from(secretKey, 'hex'))
    return Keypair.fromSecretKey(secretKeyBinary)
}