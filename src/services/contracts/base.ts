import { ethers } from "ethers";


class BaseContract {
    public signer;
    public contract;

    constructor(address: string, abi: any, signer: ethers.Signer | ethers.providers.Provider) {
        this.signer = signer;
        this.contract = new ethers.Contract(address, abi, signer);
    }
}

export default BaseContract;