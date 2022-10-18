import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  styled,
  Box
} from "@mui/material";
import { useState } from "react";
import { TokenInfoItem } from "../../types/multi";
import useDialog from "@/hooks/useDialog";
import { downloadFile } from "@/utils/download";
import { SingleFileUpload } from "@/components/upload";
import { getAddressInfosInFile } from "@/utils/fileReader";

interface ContentAddActionsProps {
  onUpdate: (infos: TokenInfoItem[]) => void;
}

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 2
}));

const parseInputValues = (inputValues: string[]): TokenInfoItem[] => {
  return inputValues.map(line => {
    const [tokenAddress, transferAmount] = line.split(",");
    return { tokenAddress, transferAmount: parseFloat(transferAmount) };
  })
    .filter(item => item.tokenAddress && item.transferAmount);
};

const ContentAddActions = ({ onUpdate }: ContentAddActionsProps) => {
  const { state: dialogState, open, close } = useDialog();
  const [value, setValue] = useState<TokenInfoItem[]>([]);

  const handleInputContent = (inputValue: string) => {
    const inputInfos: TokenInfoItem[] = parseInputValues(inputValue.split("\n"));
    setValue(inputInfos);
  };

  const handleUpload = async (file: File) => {
    const addressInfos = await getAddressInfosInFile(file);
    const newInfos = parseInputValues(addressInfos);
    console.log(newInfos);
    setValue(newInfos);
    onUpdate(newInfos);
  };

  const downloadTemplate = () => {
    downloadFile(
      "token_template.txt",
      "0x1111111111111111111111111111111111111111,0.1\n0x2222222222222222222222222222222222222222,0.2"
    );
  };

  const update = async () => {
    dialogState && close();
    onUpdate(value);
  };

  return (
    <FlexBox sx={{ mx: 3, mb: 2, gap: 2 }}>
      <Button variant="contained" onClick={open}>
        增加货币地址
      </Button>
      <Button variant="contained" onClick={downloadTemplate}>
        下载模版
      </Button>
      <SingleFileUpload onFileUpdate={handleUpload} />
      <Dialog
        fullWidth
        open={dialogState}
        onClose={(_, reson: string) => {
          if (reson !== "backdropClick") {
            close();
          }
        }}
      >
        <DialogTitle>按格式填入</DialogTitle>
        <DialogContent>
          <DialogContentText>
            格式：0x地址,金额 (以回车换行)
          </DialogContentText>
          <TextField
            id="transfer-address-info"
            multiline
            rows={8}
            variant="standard"
            placeholder="0x地址1,金额1"
            fullWidth
            autoFocus
            sx={{ mt: 2 }}
            onChange={(e) => {
              handleInputContent(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>取消</Button>
          <Button onClick={update}>确定</Button>
        </DialogActions>
      </Dialog>
    </FlexBox>
  );
};

export default ContentAddActions;