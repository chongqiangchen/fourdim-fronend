import { CardContent, Divider, Stack, Typography } from "@mui/material";

import sumBy from "lodash/sumBy";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { KeyInfosState } from "@/atoms/token/multiAccountTokenTransfer";

interface Props {
  getPreComputedGas: () => Promise<string>;
}

const Summary = ({ getPreComputedGas }: Props) => {
  const infos = useRecoilValue(KeyInfosState);
  const [preGas, setPreGas] = useState<string>();

  const allAmountNotPrecision = sumBy(infos, (item) => Number(item.amount));
  // const nums = infos.length || 0;

  useEffect(() => {
    (async () => {
      const preGas = await getPreComputedGas();
      setPreGas(preGas || "0");
    })();
  }, [getPreComputedGas]);


  return (
    <CardContent>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            总共需要支出货币
          </Typography>
          <Typography variant="subtitle2">{allAmountNotPrecision}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            预计准备GAS费用
          </Typography>
          <Typography variant="subtitle2">{preGas}</Typography>
        </Stack>
        {/* <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               收取的手续费（平台收取）
            </Typography>
            <Typography variant="subtitle2">
              {getMultiTransferFeeLabel(nums)}
            </Typography>
          </Stack> */}
        <Divider />
      </Stack>
    </CardContent>
  );
};

export default Summary;