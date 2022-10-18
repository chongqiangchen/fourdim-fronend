import { atom } from "recoil";
import { COMMON_NFT_NAME, COMMON_NFT_NAME_AND_HELPER_MAP, SUGGESTION_LIST } from "@/helper/nft";
import { NftHelper, NftInfoItem } from "@/pages/token/types/nft";

// NMT => NFT MULUTI TRANSFER
export const NftInfosState = atom<NftInfoItem[]>({
    key: 'NMT_Infos',
    default: [],
});

// const history: Set<string> = new Set();

// const historyEffect = ({ onSet }: any) => {
//     onSet((newValue: string) => {
//         history.add(newValue.toLowerCase());
//     });
// };

const OptionTitles: string[] = SUGGESTION_LIST.map(o => o.title);

const formatEffect = ({ onSet, setSelf }: any) => {
    onSet((newValue: string[]) => {
        const firstValue = newValue[0];
        let result: NftHelper = {
            nftAddresses: newValue,
            getTokenInfosFns: [],
            networkId: 56,
            tableColumns: []
        };

        if (OptionTitles.includes(firstValue)) {
            result = COMMON_NFT_NAME_AND_HELPER_MAP[firstValue as COMMON_NFT_NAME].helper as NftHelper;
        }

        setSelf(result);
    });
}

export const NftAddresState = atom<NftHelper>({
    key: 'NMT_NftAddress',
    default: {} as NftHelper,
});