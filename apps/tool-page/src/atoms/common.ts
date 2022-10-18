import { atom, selector } from "recoil";
import { ERC20_ABI, ERC721_ABI, NFT_BNX, NFT_BNX_INFO, TOKEN_HELPER_ABI } from "@/constants/abi";

// const NODE_ENV = process.env.NODE_ENV;

export const AbiState = atom({
  key: "Abi",
  default: {
    erc20: ERC20_ABI,
    erc721: ERC721_ABI,
    tokenHelper: TOKEN_HELPER_ABI,
    nftBNX: NFT_BNX,
    nftBNXInfo: NFT_BNX_INFO
  }
});

export const ContractAddressState = selector({
  key: "ContractAddress",
  get: () => {
    // eth
    // ...

    // bsc
    const bsc = {
      tokenHelper: "0x25432B8Eb7BFB0ea555f0A6a1E183eB4B49756AC"
    };
    const bscTestnet = {
      tokenHelper: "0x25432B8Eb7BFB0ea555f0A6a1E183eB4B49756AC"
    };

    return {
      bsc: bsc,
      bscTestnet: bscTestnet
    };
  }
});