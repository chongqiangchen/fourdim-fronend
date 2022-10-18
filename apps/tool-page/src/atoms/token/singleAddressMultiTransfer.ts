import { atom } from "recoil";
import { TokenInfoItem } from "@/pages/token/types/multi";

// SAMT => Single Address Multi Transfer
export const TokenInfosState = atom<TokenInfoItem[]>({
    key: 'SAMT_TokenInfosState',
    default: [],
});

const history: Set<string> = new Set();

const historyEffect = ({ onSet }: any) => {
    onSet((newValue: string) => {
        history.add(newValue.toLowerCase());
    });
};

export const TransferToAddresState = atom<string>({
    key: 'SAMT_TokenAddress',
    default: '',
    effects: [
        historyEffect
    ]
})