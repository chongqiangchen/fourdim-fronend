import { useRecoilValue } from "recoil";
import { useNetwork } from "wagmi";
import { ContractAddressState } from "@/atoms/common";


const useCommonContractAddress = () => {
  const commonAddress = useRecoilValue(ContractAddressState);
  const { chain } = useNetwork();
  const name = chain?.name?.toLocaleLowerCase() || "bsc";
  console.log(name);

  // @ts-ignore
  return commonAddress[name] || commonAddress.bsc;
};

export default useCommonContractAddress;