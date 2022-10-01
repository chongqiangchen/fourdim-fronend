

export interface NftInfoItem {
    tokenId: string;
}

export interface NftHelper {
    nftAddresses: string[];
    getTokenInfosFns: any[];
    networkId: number;
    tableColumns: any[];
}