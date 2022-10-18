import { IconButton, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { TokenInfoItem } from "../../types/multi";
import { TableHeadCustom } from "@/components/table";
import { truncation } from "@/utils/truncation";
import CopyClipboard from "@/components/CopyClipboard";
import Iconify from "@/components/Iconify";

const TABLE_HEAD = [
  { id: "tokenAddress", label: "货币地址", minWidth: 200 },
  { id: "curAccountBalance", label: "当前地址余额", minWidth: 140 },
  { id: "targetAccountBalance", label: "目标地址余额", minWidth: 140 },
  { id: "transferAmount", label: "转移金额", minWidth: 160 },
  { id: "", label: "操作", minWidth: 80 }
];

interface Props {
  infos: TokenInfoItem[];
  onAmountChange: (value: any, rowIndex: number) => void;
  onDelete: (rowIndex: number) => void;
}

const BaseTokenTable = (
  {
    infos,
    onAmountChange,
    onDelete
  }: Props
) => {
  return (
    <TableContainer>
      <Table>
        <TableHeadCustom headLabel={TABLE_HEAD} />

        <TableBody>
          {infos.map((row, index) => (
            <TokenTableRow
              onDelete={onDelete}
              onAmountChange={onAmountChange}
              key={row.tokenAddress + "_" + index}
              rowIndex={index}
              row={row}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BaseTokenTable;

interface TokenTableRowProps {
  row: TokenInfoItem;
  rowIndex: number;
  onAmountChange: (value: any, rowIndex: number) => void;
  onDelete: (rowIndex: number) => void;
}

const TokenTableRow = (
  {
    row,
    rowIndex,
    onAmountChange,
    onDelete
  }: TokenTableRowProps
) => {
  const { tokenAddress, targetAccountBalance, curAccountBalance, name } = row;
  const [innerValue, setInnerValue] = useState(row.transferAmount);

  useEffect(() => {
    if (innerValue !== row.transferAmount) {
      setInnerValue(row.transferAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row.transferAmount]);

  return (
    <TableRow>
      <TableCell>
        <CopyClipboard value={tokenAddress}>
          {name}({truncation(tokenAddress)})
        </CopyClipboard>
      </TableCell>
      <TableCell>{Number(curAccountBalance).toFixed(4)}</TableCell>
      <TableCell>{Number(targetAccountBalance).toFixed(4)}</TableCell>
      <TableCell>
        <TextField
          size="small"
          fullWidth
          value={innerValue}
          onChange={(e) => {
            setInnerValue(e.target.value);
            onAmountChange(e.target.value, rowIndex);
          }}
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => onDelete(rowIndex)}>
          <Iconify icon={"eva:trash-2-outline"} width={20} height={20} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};