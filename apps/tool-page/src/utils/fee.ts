import { BigNumber, ethers } from "ethers";

const MULTI_TRANSFER_BASE_FEE = 0.0001;

export const getMultiTransferFee = (nums: number): BigNumber => ethers.utils.parseEther(MULTI_TRANSFER_BASE_FEE * nums + "");

export const getMultiTransferFeeLabel = (nums: number): string => `${MULTI_TRANSFER_BASE_FEE} x ${nums} = ${(MULTI_TRANSFER_BASE_FEE * nums).toFixed(4)}`;