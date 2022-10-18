import { CardContent, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { TokenInfosState } from "@/atoms/token/singleAddressMultiTransfer";

interface Props {
  getPreComputedGas: () => Promise<string>;
}

const Summary = ({ getPreComputedGas }: Props) => {
  const infos = useRecoilValue(TokenInfosState);
  const [preGas, setPreGas] = useState<string>();

  useEffect(() => {
    (async () => {
      const preGas = await getPreComputedGas();
      setPreGas(preGas || "0");
    })();
  }, [getPreComputedGas]);

  return (
    <CardContent>
      <Stack spacing={2}>
        {infos.map(info => (
          <Stack key={info.tokenAddress + "_sum"} direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              货币{info.name}数量：
            </Typography>
            <Typography variant="subtitle2">{info.transferAmount}</Typography>
          </Stack>
        ))}

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            预计准备GAS费用
          </Typography>
          <Typography variant="subtitle2">{preGas}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            收取的手续费（平台收取）
          </Typography>
          <Typography variant="subtitle2">无</Typography>
        </Stack>

        <Divider />
      </Stack>
    </CardContent>
  );
};

export default Summary;