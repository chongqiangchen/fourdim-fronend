import { atom, selector } from "recoil";
import { getAccountTokenUsedList } from "@fourdimtool/web3-core";
import { provider } from "@/conenct";

// ACCOUNT
export const AccountTQueryRequestState = atom({
  key: "ACCOUNT_QueryRequest",
  default: ''
});

export const AccountUsedTokenListQuery = selector({
  key: "ACCOUNT_UsedTokenListQuery",
  get: async ({ get }) => {
    const address = get(AccountTQueryRequestState);
    console.log(address);
    if (address === '' || !address) {
      return [];
    }
    console.dir(provider({ chainId: 56 }));
    const list = await fetchAccountUsedTokenList(address);
    return list;
  }
});

const fetchAccountUsedTokenList = async (address: string) => {
  return getAccountTokenUsedList(provider({ chainId: 56 }), address);
};
