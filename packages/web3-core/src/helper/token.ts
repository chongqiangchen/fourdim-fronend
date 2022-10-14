import { ethers } from "ethers";
import BaseContract from "./base";
import * as ABI from '../constants/abi';
import { checkErc20 } from 'utils';

class TokenContract extends BaseContract {
    static isErc20(address: string, provider: ethers.providers.Provider) {
        return checkErc20(address, provider);
    }

    constructor(address: string, signer: ethers.Signer | ethers.providers.Provider) {
        super(address, ABI.ERC20_ABI, signer);
    }
}

export default TokenContract;