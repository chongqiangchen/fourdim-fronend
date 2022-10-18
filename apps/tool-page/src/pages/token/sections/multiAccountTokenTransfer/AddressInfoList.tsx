import { Card, CardHeader, Typography } from "@mui/material";
import KeyInfoTable from "./BaseTokenTable";
import { useEffect } from "react";
import uniqBy from "lodash/uniqBy";
import { useRecoilState, useRecoilValue } from "recoil";
import { KeyInfoItem } from "../../types/multi";
import { useProvider, useToken } from "wagmi";
import ContentAddActions from "./ContentAddActions";
import { ethers } from "ethers";
import { multicallv2 } from "fourdim-web3-hooks";
import { KeyInfosState, TokenAddresState } from "@/atoms/token/multiAccountTokenTransfer";
import { AbiState } from "@/atoms/common";
import Scrollbar from "@/components/Scrollbar";
import EmptyContent from "@/components/EmptyContent";

const AddressInfoList = () => {
  const [infos, setInfos] = useRecoilState(KeyInfosState);
  const tokenAddress = useRecoilValue(TokenAddresState);
  const commonAbi = useRecoilValue(AbiState);

  const provider = useProvider();
  // const contract = useContract({
  //   addressOrName: tokenAddress,
  //   contractInterface: commonAbi.erc20,
  //   signerOrProvider: provider
  // });

  const { data: tokenInfo } = useToken({ address: tokenAddress });

  const isEmpty = infos.length === 0;

  const totalItems = 3;

  const updateInfosBalance = async (infos: KeyInfoItem[]) => {
    const newInfos: KeyInfoItem[] = [...infos];

    const multiCallParams = infos.map((item) => ({
      address: tokenAddress,
      name: "balanceOf",
      params: [item.address]
    }));
    const balanceBNs = await multicallv2(commonAbi.erc20, multiCallParams, provider);
    console.log(balanceBNs);

    for (let i = 0; i < infos.length; i++) {
      const item = infos[i];
      const balanceBN = balanceBNs[i];

      try {
        newInfos[i] = {
          ...item,
          balanceBN: balanceBN,
          balance: ethers.utils.formatUnits(balanceBN, tokenInfo?.decimals || 18),
          amount: ethers.utils.formatUnits(balanceBN, tokenInfo?.decimals || 18),
          decimals: tokenInfo?.decimals || 18
        };
      } catch (error) {
        console.warn(error);
      }
    }
    console.log("newInfos", newInfos);
    return newInfos;
  };

  const handleContentUpdate = async (infos: KeyInfoItem[]) => {
    const newInfos = await updateInfosBalance(infos);
    setInfos((old) => {
      const filterDuplicateOldItems = old.filter(item => !newInfos.find(newItem => newItem.address === item.address));
      const filterDuplicateNewItems = uniqBy(newInfos, "address");
      return [...filterDuplicateOldItems, ...filterDuplicateNewItems];
    });
  };

  const handleAmountInputChange = (value: any, rowIndex: number) => {
    setInfos(old => {
      const newInfos = [...old];
      newInfos[rowIndex] = {
        ...newInfos[rowIndex],
        amount: value
      };
      return newInfos;
    });
  };

  const handleDelete = (address: string) => {
    const newInfos = infos.filter(info => info.address !== address);
    setInfos(newInfos);
  };

  useEffect(() => {
    (async () => {
      if (tokenAddress) {
        const newInfos = await updateInfosBalance(infos);
        console.log(newInfos);
        setInfos(newInfos);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAddress]);

  useEffect(() => {
    return () => setInfos([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6">
            账户信息表
            <Typography component="span" sx={{ color: "text.secondary" }}>
              &nbsp;({totalItems} 项)
            </Typography>
          </Typography>
        }
        sx={{ mb: 3 }}
      />
      <ContentAddActions onUpdate={handleContentUpdate} />
      {!isEmpty ? (
        <Scrollbar sx={{ px: 2 }}>
          <KeyInfoTable
            onDelete={(rowIndex: number) => handleDelete(infos[rowIndex].address)}
            infos={infos}
            onAmountChange={handleAmountInputChange}
            decimals={tokenInfo?.decimals}
          />
        </Scrollbar>
      ) : (
        <EmptyContent
          title="当前内容为空"
          description="请下载模版并填充归集的账户私钥信息进行上传"
          img="/assets/illustrations/illustration_empty_cart.svg"
        />
      )}
    </Card>
  );
};

export default AddressInfoList;


