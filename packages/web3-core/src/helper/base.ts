import { ethers } from 'ethers';


class BaseContract {
  public signer;
  public contract;
  public provider: ethers.providers.Provider = {} as any;

  constructor(address: string, abi: any, signer: ethers.Signer | ethers.providers.Provider) {
    this.signer = signer;
    this.contract = new ethers.Contract(address, abi, signer);

    if (signer instanceof ethers.providers.Provider) {
      this.provider = signer;
    } else if (signer.provider) {
      this.provider = signer.provider;
    }
  }
}

export default BaseContract;