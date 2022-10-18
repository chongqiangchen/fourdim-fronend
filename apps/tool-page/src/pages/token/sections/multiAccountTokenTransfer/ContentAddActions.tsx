import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, styled, Box } from "@mui/material";
import { ethers } from "ethers";
import { useState } from "react";
import { useProvider } from "wagmi";
import { KeyInfoItem } from "../../types/multi";
import useDialog from "@/hooks/useDialog";
import { getAddressInfosInFile } from "@/utils/fileReader";
import { downloadFile } from "@/utils/download";
import { SingleFileUpload } from "@/components/upload";

interface ContentAddActionsProps {
    onUpdate: (infos: KeyInfoItem[]) => void;
}

const FlexBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 2
}));

const ContentAddActions = ({ onUpdate }: ContentAddActionsProps) => {
    const { state: dialogState, open, close } = useDialog();
    const [value, setValue] = useState<KeyInfoItem[]>([]);
    const provider = useProvider();

    const parseInputValues = (inputValues: string[]): KeyInfoItem[] => {
        return inputValues.map(line => {
            const trimLine = line.trim();
            try {
                const wallet = new ethers.Wallet(trimLine, provider);
                return { address: wallet.address, privateKey: trimLine };
            } catch (error) {
                return {} as KeyInfoItem;
            }

        }).filter(item => item.address && item.privateKey)
    }


    const handleInputContent = (inputValue: string) => {
        const inputInfos: KeyInfoItem[] = parseInputValues(inputValue.split('\n'));
        console.log(inputInfos);
        setValue(inputInfos);
    }

    const handleUpload = async (file: File) => {
        const keyInfos = await getAddressInfosInFile(file);
        const newKeyInfos = parseInputValues(keyInfos);
        console.log(newKeyInfos);
        setValue(newKeyInfos);
        onUpdate(newKeyInfos);
    }

    const downloadTemplate = () => {
        downloadFile(
            'keys_template.txt',
            '0x1111111111111111111111111111111111111111\n0x2222222222222222222222222222222222222222'
        );
    }

    const update = async () => {
        dialogState && close();
        onUpdate(value);
    }

    return (
        <FlexBox sx={{ mx: 3, mb: 2, gap: 2 }}>
            <Button variant="contained" onClick={open}>
                增加账户私钥
            </Button>
            <Button variant="contained" onClick={downloadTemplate}>
                下载模版
            </Button>
            <SingleFileUpload onFileUpdate={handleUpload} />
            <Dialog
                fullWidth
                open={dialogState}
                onClose={(_, reson: string) => {
                    if (reson !== 'backdropClick') {
                        close();
                    }
                }}
            >
                <DialogTitle>按格式填入</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        格式：0x私钥 (以回车换行)
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
    )
}

export default ContentAddActions;