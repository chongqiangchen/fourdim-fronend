import { atom } from "recoil";
import { AddressInfoItem } from "@/pages/token/types/multi";

// STMT => Single Token Multi Transfer
export const AddressInfosState = atom<AddressInfoItem[]>({
    key: 'STMT_AddressInfos',
    default: [],
});

const history: Set<string> = new Set();

const historyEffect = ({ onSet }: any) => {
    onSet((newValue: string) => {
        history.add(newValue.toLowerCase());
    });
};

export const TokenAddresState = atom<string>({
    key: 'STMT_TokenAddress',
    default: '',
    effects: [
        historyEffect
    ]
})