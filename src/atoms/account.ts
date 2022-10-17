import { atomFamily, selectorFamily } from "recoil";
import { getAccountTokenUsedList } from "@fourdimtool/web3-core";
import { provider } from "src/conenct";

// ACCOUNT
export const AccountTokenUsedInfoQueryRequestIDState = atomFamily({
  key: "ACCOUNT_UsedTokenInfoQueryRequestID",
  default: 0
});

export const AccountUsedTokenListQuery = selectorFamily({
  key: "ACCOUNT_UsedTokenListQuery",
  get: (address: string) => async ({ get }) => {
    get(AccountTokenUsedInfoQueryRequestIDState(address));
    const list = await fetchAccountUsedTokenList(address);
    return list;
  }
});

const fetchAccountUsedTokenList = async (address: string) => {
  getAccountTokenUsedList(provider as any, address);
};
