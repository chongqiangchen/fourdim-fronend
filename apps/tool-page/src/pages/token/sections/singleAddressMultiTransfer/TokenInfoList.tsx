import { Card, CardHeader, Typography } from "@mui/material";
import ContentAddActions from "./ContentAddActions";
import TokenInfoTable from "./BaseTokenTable";
import { useRecoilState, useRecoilValue } from "recoil";
import { TokenInfoItem } from "../../types/multi";
import { useAccount, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";
import { useEffect } from "react";
import uniqBy from "lodash/uniqBy";
import { TokenInfosState, TransferToAddresState } from "@/atoms/token/singleAddressMultiTransfer";
import { AbiState } from "@/atoms/common";
import EmptyContent from "@/components/EmptyContent";
import Scrollbar from "@/components/Scrollbar";

const TokenInfoList = () => {
  const [infos, setInfos] = useRecoilState<TokenInfoItem[]>(TokenInfosState);
  const toAddress = useRecoilValue(TransferToAddresState);
  const commonAbi = useRecoilValue(AbiState);

  const { address: curAccountAddress } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const isEmpty = infos.length === 0;
  const total = infos.length;

  const updateInfosBalance = async (infos: TokenInfoItem[]) => {
    const newInfos: TokenInfoItem[] = [...infos];

    for (let i = 0; i < infos.length; i++) {
      const item = infos[i];

      console.log(item);

      const tokenContract = new ethers.Contract(item.tokenAddress, commonAbi.erc20, signer || provider);

      const decimals = await tokenContract.decimals();
      const symbol = await tokenContract.symbol();
      const name = await tokenContract.name();

      const targetAccountBalanceBN = toAddress ? await tokenContract.balanceOf(toAddress) : ethers.BigNumber.from(0);
      const targetAccountBalance = ethers.utils.formatUnits(targetAccountBalanceBN, decimals).toString();
      const curAccountBalanceBN = curAccountAddress ? await tokenContract.balanceOf(curAccountAddress) : ethers.BigNumber.from(0);
      const curAccountBalance = ethers.utils.formatUnits(curAccountBalanceBN, decimals).toString();

      newInfos[i] = {
        ...item,
        targetAccountBalanceBN,
        targetAccountBalance,
        curAccountBalanceBN,
        curAccountBalance,

        // token
        decimals: decimals,
        symbol: symbol,
        name: name
      };
    }

    return newInfos;
  };

  const handleAmountInputChange = (value: any, rowIndex: number) => {
    setInfos(old => {
      const newInfos = [...old];
      newInfos[rowIndex] = {
        ...newInfos[rowIndex],
        transferAmount: value
      };
      return newInfos;
    });
  };

  const handleContentUpdate = async (infos: TokenInfoItem[]) => {
    const newInfos = await updateInfosBalance(infos);
    setInfos((old) => {
      const filterDuplicateOldItems = old.filter(item => !newInfos.find(newItem => newItem.tokenAddress === item.tokenAddress));
      const filterDuplicateNewItems = uniqBy(newInfos, "tokenAddress");
      return [...filterDuplicateOldItems, ...filterDuplicateNewItems];
    });
  };

  const handleDelete = (tokenAddress: string) => {
    const newInfos = infos.filter(info => info.tokenAddress !== tokenAddress);
    setInfos(newInfos);
  };

  useEffect(() => {
    (async () => {
      if (curAccountAddress || toAddress) {
        const newInfos = await updateInfosBalance(infos);
        setInfos(newInfos);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curAccountAddress, toAddress]);

  // @ts-ignore
  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6">
            货币信息表
            <Typography component="span" sx={{ color: "text.secondary" }}>
              &nbsp;({total} 项)
            </Typography>
          </Typography>
        }
        sx={{ mb: 3 }}
      />
      <ContentAddActions onUpdate={handleContentUpdate} />
      {!isEmpty ? (
        <Scrollbar sx={{ px: 2 }}>
          <TokenInfoTable
            onDelete={(rowIndex: number) => handleDelete(infos[rowIndex].tokenAddress)}
            infos={infos}
            onAmountChange={handleAmountInputChange}
          />
        </Scrollbar>
      ) : (
        <EmptyContent
          title="当前内容为空"
          description="请下载模版并填充货币地址信息进行上传"
          img="/assets/illustrations/illustration_empty_cart.svg"
        />
      )}
    </Card>
  );
};

export default TokenInfoList;