import { useRecoilValue } from "recoil"
import { ContractAddressState } from "src/atoms/common"
import { useNetwork } from "wagmi";


const useCommonContractAddress = () => {
    const commonAddress = useRecoilValue(ContractAddressState);
    const {chain} = useNetwork();
    const name = chain?.name?.toLocaleLowerCase() || 'bsc';
    console.log(name);
    
    // @ts-ignore
    return commonAddress[name] || commonAddress.bsc;
}

export default useCommonContractAddress;