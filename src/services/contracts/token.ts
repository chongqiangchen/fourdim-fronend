import { ethers } from "ethers";
import BaseContract from "./base";
import * as ABI from '../../constants/abi';

class TokenContract extends BaseContract {

    constructor(address: string, signer: ethers.Signer | ethers.providers.Provider) {
        super(address, ABI.ERC20_ABI, signer);
    }
}

export default TokenContract;