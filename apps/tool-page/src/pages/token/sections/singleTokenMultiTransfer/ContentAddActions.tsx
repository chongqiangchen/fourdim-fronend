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
import { AddressInfoItem } from "../../types/multi";
import { getAddressInfosInFile } from "@/utils/fileReader";
import { SingleFileUpload } from "@/components/upload";
import { downloadFile } from "@/utils/download";
import useDialog from "@/hooks/useDialog";

interface ContentAddActionsProps {
  onUpdate: (infos: AddressInfoItem[]) => void;
}

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 2
}));

const parseInputValues = (inputValues: string[]): AddressInfoItem[] => inputValues.map(line => {
  const [address, amount] = line.split(",");
  return { address, amount: parseFloat(amount) };
}).filter(item => item.address && item.amount);

const ContentAddActions = ({ onUpdate }: ContentAddActionsProps) => {
  const { state: dialogState, open, close } = useDialog();
  const [value, setValue] = useState<AddressInfoItem[]>([]);

  const handleInputContent = (inputValue: string) => {
    const inputAddressInfos: AddressInfoItem[] = parseInputValues(inputValue.split("\n"));
    console.log(inputAddressInfos);
    setValue(inputAddressInfos);
  };

  const handleUpload = async (file: File) => {
    const addressInfos = await getAddressInfosInFile(file);
    const newAddressInfos = parseInputValues(addressInfos);
    console.log(newAddressInfos);
    setValue(newAddressInfos);
    onUpdate(newAddressInfos);
  };

  const downloadTemplate = () => {
    downloadFile(
      "address_template.txt",
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
        增加转移地址
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