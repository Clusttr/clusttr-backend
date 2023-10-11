import { Option, Some } from "@metaplex-foundation/umi";
import { Creator } from "@metaplex-foundation/mpl-token-metadata";

export function getCreators(creators: Option<Array<Creator>>) {
    const someCreators = creators as Some<Array<Creator>>
    const value = someCreators.value
    return value
  }