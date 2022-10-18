import { atom, AtomEffect } from "recoil";
import { KeyInfoItem } from "@/pages/token/types/multi";

// MATT => MULTI ACCOUNT TOEKN TRANSFER
export const KeyInfosState = atom<KeyInfoItem[]>({
    key: 'MATT_KeyInfos',
    default: [],
});

const history: Set<string> = new Set();

const historyEffect = ({ onSet }: any) => {
    onSet((newValue: string) => {
        history.add(newValue.toLowerCase());
    });
};

export const TokenAddresState = atom<string>({
    key: 'MATT_TokenAddress',
    default: '',
    effects: [
        historyEffect
    ]
})


export const TargetAddresState = atom<string>({
    key: 'MATT_TargetAddres',
    default: '',
})