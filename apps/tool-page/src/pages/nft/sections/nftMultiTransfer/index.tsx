import { Box, Card, CardHeader, Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import NftInfoList from "./NftInfoList";
import AutoSelectNftAddress from "./AutoSelectNftAddress";
import { styled } from "@mui/material/styles";

const CardFlexItem = styled(Card)(() => ({
  flex: 1
}));

const NftMultiTransferList = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            mb: 1
          }}
        >
          <CardFlexItem>
            <Box sx={{ px: 2, py: 2 }}>
              <AutoSelectNftAddress />
            </Box>
          </CardFlexItem>
          <CardFlexItem>
            <Box sx={{ px: 2, py: 2 }}>
              <TextField
                label="转移地址"
                fullWidth
              />
            </Box>
          </CardFlexItem>
        </Box>
        <NftInfoList />
      </Grid>
      {/*<Grid item xs={12} md={2}>*/}
      {/*    <Card sx={{ mb: 3 }}>*/}
      {/*        <CardHeader title="合计" />*/}
      {/*        /!* <Summary getPreComputedGas={getPreComputedGas} /> *!/*/}
      {/*    </Card>*/}

      {/*    <LoadingButton*/}
      {/*        fullWidth*/}
      {/*        size="large"*/}
      {/*        variant="contained"*/}
      {/*    //  loading={isApproveLoading || isTxLoading}*/}
      {/*    //  loadingIndicator={(*/}
      {/*    //     <Stack direction="row" alignItems="center">*/}
      {/*    //         <CircularProgress color="inherit" size={16} />*/}
      {/*    //         <Typography sx={{ml: 1}}>*/}
      {/*    //             {isApproveLoading && !isTxLoading && '授权中...'}*/}
      {/*    //             {isTxLoading && '执行中...'}*/}
      {/*    //         </Typography>*/}
      {/*    //     </Stack>*/}
      {/*    //  )}*/}
      {/*    //  onClick={run}*/}
      {/*    >*/}
      {/*        执行*/}
      {/*    </LoadingButton>*/}
      {/*</Grid>*/}
    </Grid>
  );
};

export default NftMultiTransferList;