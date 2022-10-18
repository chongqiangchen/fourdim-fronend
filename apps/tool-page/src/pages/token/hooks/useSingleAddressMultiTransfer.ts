import { ethers } from "ethers";
import { callWithEstimateGas, estimateGas } from "fourdim-web3-hooks";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useProvider, useSigner } from "wagmi";
import { AbiState } from "@/atoms/common";
import { TokenInfosState, TransferToAddresState } from "@/atoms/token/singleAddressMultiTransfer";


const useSingleTokenMultiTransfer = () => {
  // contracts
  const commonAbi = useRecoilValue(AbiState);
  const { data: signer } = useSigner();
  const provider = useProvider();

  // status
  const infos = useRecoilValue(TokenInfosState);
  const toAddress = useRecoilValue(TransferToAddresState);
  const [isTxLoading, setIsTxLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const run = async () => {
    try {
      for (let i = 0; i < infos.length; i++) {
        const item = infos[i];

        const tokenContract = new ethers.Contract(item.tokenAddress, commonAbi.erc20, signer || provider);

        const tx = await callWithEstimateGas(
          tokenContract,
          "transferFrom",
          [toAddress, item.transferAmount],
          {},
          21000
        );
        await tx.wait();
        enqueueSnackbar(`Transfer ${item.name} success`, { variant: "success" });
      }
    } catch (error) {
      console.warn(error);
      enqueueSnackbar("Transfer failed", { variant: "error" });
    }
    setIsTxLoading(false);
  };

  const getPreComputedGas = async () => {
    let preGasLimit = ethers.BigNumber.from(21000);
    let allGasLimit = ethers.BigNumber.from(0);

    for (let i = 0; i < infos.length; i++) {
      const item = infos[i];

      const tokenContract = new ethers.Contract(item.tokenAddress, commonAbi.erc20, signer || provider);

      try {
        preGasLimit = await estimateGas(
          tokenContract,
          "transferFrom",
          [toAddress, item.transferAmount],
          1000
        );
      } catch (e) {
      }

      allGasLimit = allGasLimit.add(preGasLimit);
    }

    const gasPrice = ethers.utils.parseUnits("5", 9);
    return ethers.utils.formatEther(allGasLimit.mul(gasPrice)).toString();
  };

  return {
    run,
    isTxLoading,
    getPreComputedGas
  };
};

export default useSingleTokenMultiTransfer;