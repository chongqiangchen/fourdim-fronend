import { ethers } from "ethers";
import { callWithEstimateGas } from "fourdim-web3-hooks";
import { useRecoilValue } from "recoil";
import { useProvider } from "wagmi";
import { AbiState } from "@/atoms/common";
import { KeyInfosState, TargetAddresState, TokenAddresState } from "@/atoms/token/multiAccountTokenTransfer";

const useMultiAccountTokenTransfer = () => {
    const provider = useProvider();
    const tokenAddress = useRecoilValue(TokenAddresState);
    const targetAddres = useRecoilValue(TargetAddresState);
    const commonAbi = useRecoilValue(AbiState);
    const infos = useRecoilValue(KeyInfosState);

    const run = async () => {
        const rqs = [];
        for (let info of infos) {
            rqs.push(async () => {
                const wallet = new ethers.Wallet(info.privateKey, provider);
                const tokenContract = new ethers.Contract(tokenAddress, commonAbi.erc20, wallet);

                await callWithEstimateGas(
                    tokenContract, 
                    'transferFrom', 
                    [wallet.address, targetAddres, ethers.utils.parseUnits(info.amount + '', info.decimals || 18)],
                    {},
                )
            });
        }
        await Promise.all(rqs.map(rq => rq()));
    }


    return {};
}

export default useMultiAccountTokenTransfer;