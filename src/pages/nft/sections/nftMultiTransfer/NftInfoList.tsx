import { Box, Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled, TextField, Typography } from "@mui/material";
import Scrollbar from "src/components/Scrollbar";
import EmptyContent from "src/components/EmptyContent";
import useNFT from "../../hooks/useNFT";
import flatten from "lodash/flatten";
import { useRecoilValue } from "recoil";
import { NftAddresState } from "src/atoms/nft/nftMultiTransfer";
import NftTable from "./BaseTokenTable";

const FlexBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 2
}));

const NftInfoList = () => {
    const nftAddressInfo = useRecoilValue(NftAddresState);
    const {data, loading, reload} = useNFT(nftAddressInfo);

    const flattenData = flatten(data);

    console.log(data);

    const isEmpty = flattenData.length === 0;
    const totalItems = flattenData.length;

    return (
        <Card>
            <CardHeader
                title={
                    <Typography variant="h6">
                        账户信息表
                        <Typography component="span" sx={{ color: 'text.secondary' }}>
                            &nbsp;({totalItems} 项)
                        </Typography>
                    </Typography>
                }
                sx={{ mb: 3 }}
            />
            {!isEmpty ? (
                <Scrollbar sx={{ px: 2 }}>
                    <NftTable
                        data={data}
                        columns={nftAddressInfo.tableColumns}
                    />
                    {/* <KeyInfoTable
                        onDelete={(rowIndex: number) => handleDelete(infos[rowIndex].address)}
                        infos={infos}
                        onAmountChange={handleAmountInputChange}
                        decimals={tokenInfo?.decimals}
                    /> */}
                </Scrollbar>
            ) : (
                <EmptyContent
                    title="当前内容为空"
                    description="请下载模版并填充归集的账户私钥信息进行上传"
                    img="/assets/illustrations/illustration_empty_cart.svg"
                />
            )}
        </Card>
    )
}

export default NftInfoList;


