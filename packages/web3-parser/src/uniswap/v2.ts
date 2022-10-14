import { ethers } from "ethers";
import {
    UniswapV2Router,
    UniswapV2Pair,
    UniswapV2Factory
} from "@fourdimtool/web3-abi";

export function parseUniswapV2Router(name: string, data: string) {
    const itfc = new ethers.utils.Interface(UniswapV2Router);
    return itfc.decodeFunctionData(name, data);
}

export function parseUniswapV2Pair(name: string, data: string) {
    const itfc = new ethers.utils.Interface(UniswapV2Pair);
    return itfc.decodeFunctionData(name, data);
}

export function parseUniswapV2Factory(name: string, data: string) {
    const itfc = new ethers.utils.Interface(UniswapV2Factory);
    return itfc.decodeFunctionData(name, data);
}