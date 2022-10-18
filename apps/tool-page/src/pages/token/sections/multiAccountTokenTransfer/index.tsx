import { Box, Card, CardHeader, CircularProgress, Grid, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRecoilState } from "recoil";
import useSingleTokenMultiTransfer from "../../hooks/useSingleTokenMultiTransfer";
import AddressInfoList from "./AddressInfoList";
import ContentUpdateActions from "./ContentUpdateActions";
import Summary from "./Summary";
import { TargetAddresState, TokenAddresState } from "@/atoms/token/multiAccountTokenTransfer";

const SingleTokenMultiTransferList = () => {
  const [tokenAddress, setTokenAddress] = useRecoilState(TokenAddresState);
  const [targetAddress, setTargetAddress] = useRecoilState(TargetAddresState);
  const { run, isApproveLoading, isTxLoading, getPreComputedGas } = useSingleTokenMultiTransfer();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <Card sx={{ mb: 3 }}>
          <Box sx={{ px: 2, py: 2 }}>
            <TextField
              label="归集地址"
              fullWidth
              value={targetAddress}
              onChange={(e) => setTargetAddress(e.target.value)}
            />
          </Box>
        </Card>
        <Card sx={{ mb: 3 }}>
          <Box sx={{ px: 2, py: 2 }}>
            <TextField
              label="货币地址"
              fullWidth
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </Box>
        </Card>
        <AddressInfoList />
      </Grid>
      <Grid item xs={12} md={5}>
        <Card sx={{ mb: 3 }}>
          <CardHeader title="快捷变更余额" />
          <ContentUpdateActions />
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="合计" />
          <Summary getPreComputedGas={getPreComputedGas} />
        </Card>

        <LoadingButton
          fullWidth
          size="large"
          variant="contained"
          loading={isApproveLoading || isTxLoading}
          loadingIndicator={(
            <Stack direction="row" alignItems="center">
              <CircularProgress color="inherit" size={16} />
              <Typography sx={{ ml: 1 }}>
                {isApproveLoading && !isTxLoading && "授权中..."}
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

export default SingleTokenMultiTransferList;