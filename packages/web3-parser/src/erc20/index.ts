import { ERC20 } from "@fourdimtool/web3-abi";
import { ethers } from "ethers";

export function parseERC20(name: string, data: string) {
    const iftc = new ethers.utils.Interface(ERC20);
    return iftc.decodeFunctionData(name, data);
}