import decompile from 'utils/decompile';
import { ethers } from 'ethers';

export default async function checkErc20(address: string, provider: ethers.providers.Provider) {
  const dRes = await decompile(address, provider);
  const needFunc = [
    "totalSupply()",
    "balanceOf(address)",
    "transfer(address,uint256)",
    "transferFrom(address,address,uint256)",
    "approve(address,uint256)",
    "allowance(address,address)",
  ];

  let result = false;

  for (const funcName of needFunc) {
    if (dRes.includes(funcName)) {
      result = true;
    } else {
      result = false;
      break;
    }
  }

  return result;
}