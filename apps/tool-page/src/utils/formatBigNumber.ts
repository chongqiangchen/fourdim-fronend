import { BigNumber, ethers } from "ethers";
import { fShortenNumber } from "@/utils/formatNumber";


export const formatTokenPrice = (value: BigNumber, decimals: number): string => fShortenNumber(ethers.utils.formatUnits(value, decimals).toString())

export const parseTokenPrice = (value: string, decimals: number): BigNumber => ethers.utils.parseUnits(value, decimals)