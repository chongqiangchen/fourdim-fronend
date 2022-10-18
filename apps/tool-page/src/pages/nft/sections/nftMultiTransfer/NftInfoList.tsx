import { Card, CardHeader, Typography } from '@mui/material';
import useNFT from '../../hooks/useNFT';
import flatten from 'lodash/flatten';
import { useRecoilValue } from 'recoil';
import NftTable from './BaseTokenTable';
import { NftAddresState } from "@/atoms/nft/nftMultiTransfer";
import EmptyContent from "@/components/EmptyContent";
import Scrollbar from "@/components/Scrollbar";

const NftInfoList = () => {
  const nftAddressInfo = useRecoilValue(NftAddresState);
  const { data } = useNFT(nftAddressInfo);

  const flattenData = flatten(data);

  const isEmpty = flattenData.length === 0;
  const totalItems = flattenData.length;

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant='h6'>
            账户信息表
            <Typography component='span' sx={{ color: 'text.secondary' }}>
              &nbsp;({totalItems} 项)
            </Typography>
          </Typography>
        }
        sx={{ mb: 3 }}
      />
      {!isEmpty ? (
        <Scrollbar sx={{ px: 2 }}>
          <NftTable
            data={flattenData}
            columns={nftAddressInfo.tableColumns}
          />
        </Scrollbar>
      ) : (
        <EmptyContent
          title='当前内容为空'
          description='请下载模版并填充归集的账户私钥信息进行上传'
          img='/assets/illustrations/illustration_empty_cart.svg'
        />
      )}
    </Card>
  );
};

export default NftInfoList;


