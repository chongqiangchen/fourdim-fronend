import { EVM } from 'evm';
import { ethers } from 'ethers';

export default async function decompile(contractAddress: string, provider: ethers.providers.Provider) {
  const code = await provider.getCode(contractAddress);
  const evm = new EVM(code);
  return evm.getFunctions();
}
