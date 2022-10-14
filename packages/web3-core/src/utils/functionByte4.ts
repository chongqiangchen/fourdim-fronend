const { ethers } = require('ethers');

export default function getContractFunctionByte4(signature: string) {
  return ethers.utils.hexDataSlice(ethers.utils.id(signature), 0, 4);
}