import { Box, Button, styled, TextField } from "@mui/material"
import { useState } from "react";
import { useRecoilState } from "recoil";
import { AddressInfoItem } from "../../types/multi";
import { AddressInfosState } from "@/atoms/token/singleTokenMultiTransfer";

const FlexBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 2
}));

const ContentUpdateActions = () => {
    const [infos, setInfos] = useRecoilState(AddressInfosState);
    const [fixedValue, setFixedValue] = useState<number>(0);
    const [value, setValue] = useState<number>(0);

    const updateInfosAmount = (isFixed: boolean) => {
        const newInfos: AddressInfoItem[] = [];
        const amount = isFixed ? fixedValue : value;

        for (const item of infos) {
            try {
                const computedAmount = !isFixed ? amount : amount - Number(item?.balance || 0);
                newInfos.push({ ...item, amount: computedAmount < 0 ? 0 : computedAmount });
            } catch (error) {
                console.warn(error);
            }
        }
        setInfos(newInfos);
    }

    return (
        <Box sx={{ mx: 3, mt: 2, gap: 2 }}>
            <FlexBox sx={{ gap: 1, mb: 3 }}>
                <TextField label="数量" size='small' onChange={(e) => setFixedValue(Number(e.target.value) || 0)} />
                <Button variant="contained" onClick={() => updateInfosAmount(true)}>快速补额</Button>
            </FlexBox>
            <FlexBox sx={{ gap: 1, mb: 3 }}>
                <TextField size='small' label="数量" onChange={e => setValue(Number(e.target.value) || 0)} />
                <Button variant="contained" onClick={() => updateInfosAmount(false)}>快速填额</Button>
            </FlexBox>
        </Box>
    )
}

export default ContentUpdateActions;