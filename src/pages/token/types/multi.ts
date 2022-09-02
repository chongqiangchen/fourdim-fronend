import { BigNumber } from "ethers";


export interface AddressInfoItem {
    address: string;
    amount: number | string;
    balance?: number | string;
    balanceBN?: BigNumber | string;
    decimals?: number;
}

export interface KeyInfoItem {
    privateKey: string;
    address: string;
    amount?: number | string;
    balance?: number | string;
    balanceBN?: BigNumber | string;
    decimals?: number;
}

export interface TokenInfoItem {
    targetAccountBalance?: string;
    targetAccountBalanceBN?: BigNumber;
    curAccountBalance?: number | string;
    curAccountBalanceBN?: BigNumber | string;
    transferAmount: number | string;

    // token info
    tokenAddress: string;
    decimals?: number;
    symbol?: string;
    name?: string;
}