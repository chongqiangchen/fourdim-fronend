import bnxHelper from './bnx';

export enum COMMON_NFT_NAME {
    BSC_BNX = 'BNX (BSC)',
    BSC_CT = 'CT (BSC)',
}

export const COMMON_NFT_NAME_AND_HELPER_MAP = {
    [COMMON_NFT_NAME.BSC_BNX]: {
        name: COMMON_NFT_NAME.BSC_BNX,
        helper: bnxHelper
    },
    [COMMON_NFT_NAME.BSC_CT]: {
        name: COMMON_NFT_NAME.BSC_CT,
        helper: bnxHelper
    },
}

export const SUGGESTION_LIST = [
    { title: COMMON_NFT_NAME.BSC_BNX },
    { title: COMMON_NFT_NAME.BSC_CT },
]
