import { useSetRecoilState } from "recoil";
import { AccountTQueryRequestState } from "@/atoms/account";


const useRefreshAccountRequest = () => {
  const setUserInfoQueryRequestID = useSetRecoilState(AccountTQueryRequestState);
  return (newAddress: string) => {
    setUserInfoQueryRequestID(newAddress || '');
  };
}

export default useRefreshAccountRequest;