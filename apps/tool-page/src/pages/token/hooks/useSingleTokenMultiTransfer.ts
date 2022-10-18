import { BigNumber, ethers } from "ethers";
import { callWithEstimateGas, estimateGas } from "fourdim-web3-hooks";
import sumBy from "lodash/sumBy";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useContract, useProvider, useSigner } from "wagmi";
import { AbiState } from "@/atoms/common";
import { AddressInfosState, TokenAddresState } from "@/atoms/token/singleTokenMultiTransfer";
import useCommonContractAddress from "@/hooks/useCommonContractAddress";

const useSingleTokenMultiTransfer = () => {
  // contracts
  const tokenAddress = useRecoilValue(TokenAddresState);
  const commonAbi = useRecoilValue(AbiState);
  const { data: signer } = useSigner();
  const { tokenHelper } = useCommonContractAddress();
  const provider = useProvider();

  const tokenContract = useContract({
    addressOrName: tokenAddress,
    contractInterface: commonAbi.erc20,
    signerOrProvider: signer || provider
  });
  const helperContract = useContract({
    addressOrName: tokenHelper,
    contractInterface: commonAbi.tokenHelper,
    signerOrProvider: signer || provider
  });

  // status
  const infos = useRecoilValue(AddressInfosState);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isTxLoading, setIsTxLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const aprrove = async (amount: BigNumber) => {
    setIsApproveLoading(true);
    try {
      const tx = await tokenContract.approve(tokenHelper, amount.add(1000));
      await tx.wait();
      enqueueSnackbar("Approve success", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Approve failed", { variant: "error" });
      setIsApproveLoading(false);
      throw Error("TokenHelper Approve failed");
    }
    setIsApproveLoading(false);
  };

  const run = async () => {
    try {
      const recipients: string[] = infos.map(function(info) {
        return info.address;
      });
      const amounts: BigNumber[] = infos.map(function(info) {
        return ethers.utils.parseUnits(info.amount + "", info.decimals || 18);
      });

      const decimals = infos[0] && infos[0].decimals || 18;
      const allAmountNotPrecision = sumBy(infos, (item) => Number(item.amount));
      const allAmountBN = ethers.utils.parseUnits(allAmountNotPrecision + "", decimals);

      await aprrove(allAmountBN);

      const nums = recipients.length;

      setIsTxLoading(true);
      const tx = await callWithEstimateGas(
        helperContract,
        "batchTransferToken",
        [tokenAddress, recipients, amounts],
        {
          // @ts-ignore
          value: getMultiTransferFee(nums)
        },
        nums <= 10 ? nums * 100000 : nums * 80000
      );
      await tx.wait();
      enqueueSnackbar("Transfer success", { variant: "success" });
    } catch (error) {
      if (error !== "TokenHelper Approve failed") {
        enqueueSnackbar("Transfer failed", { variant: "error" });
      }
    }
    setIsTxLoading(false);
  };

  const getPreComputedGas = async () => {
    const recipients: string[] = infos.map(function(info) {
      return info.address;
    });
    const amounts: BigNumber[] = infos.map(function(info) {
      return ethers.utils.parseUnits(info.amount + "", info.decimals || 18);
    });

    const nums = recipients.length;

    let preGasLimit = ethers.BigNumber.from(nums <= 10 ? nums * 100000 : nums * 80000);

    try {
      preGasLimit = await estimateGas(
        helperContract,
        "batchTransferToken",
        [tokenAddress, recipients, amounts],
        1000
      );
    } catch (e) {
    }

    const gasPrice = ethers.utils.parseUnits("5", 9);

    return ethers.utils.formatEther(preGasLimit.mul(gasPrice)).toString();
  };

  return {
    run,
    isApproveLoading,
    isTxLoading,
    getPreComputedGas
  };
};

export default useSingleTokenMultiTransfer;