import { LoadingButton } from "@mui/lab";
import { Box, Card, CardHeader, CircularProgress, Grid, Stack, TextField, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import useSingleAddressMultiTransfer from "../../hooks/useSingleAddressMultiTransfer";
import Summary from "./Summary";
import TokenInfoList from "./TokenInfoList";
import { TransferToAddresState } from "@/atoms/token/singleAddressMultiTransfer";


const SingleAddressMultiTransferList = () => {
  const [toAddress, setToAddress] = useRecoilState(TransferToAddresState);
  const { run, isTxLoading, getPreComputedGas } = useSingleAddressMultiTransfer();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <Card sx={{ mb: 3 }}>
          <Box sx={{ px: 2, py: 2 }}>
            <TextField
              label="转移到（输入目标钱包）"
              fullWidth
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
          </Box>
        </Card>
        <TokenInfoList />
      </Grid>
      <Grid item xs={12} md={5}>
        <Card sx={{ mb: 3 }}>
          <CardHeader title="合计" />
          <Summary getPreComputedGas={getPreComputedGas} />
        </Card>
        <LoadingButton
          fullWidth
          size="large"
          variant="contained"
          loading={isTxLoading}
          loadingIndicator={(
            <Stack direction="row" alignItems="center">
              <CircularProgress color="inherit" size={16} />
              <Typography sx={{ ml: 1 }}>
                {isTxLoading && "执行中..."}
              </Typography>
            </Stack>
          )}
          onClick={run}
        >
          执行
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default SingleAddressMultiTransferList;