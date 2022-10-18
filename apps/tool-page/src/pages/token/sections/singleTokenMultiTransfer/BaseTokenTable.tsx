import { IconButton, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AddressInfoItem } from "../../types/multi";
import Iconify from "@/components/Iconify";
import { truncation } from "@/utils/truncation";
import CopyClipboard from "@/components/CopyClipboard";
import { TableHeadCustom } from "@/components/table";

const TABLE_HEAD = [
  { id: "address", label: "地址", width: 200 },
  { id: "balance", label: "余额" },
  { id: "amount", label: "转账金额", width: 160 },
  { id: "", label: "操作" }
];

interface Props {
  infos: AddressInfoItem[],
  decimals?: number,
  onAmountChange: (value: any, rowIndex: number) => void;
  onDelete: (rowIndex: number) => void;
}

export default function TokenTable({
                                     infos,
                                     decimals = 18,
                                     onAmountChange,
                                     onDelete
                                   }: Props) {
  return (
    <TableContainer>
      <Table>
        <TableHeadCustom headLabel={TABLE_HEAD} />

        <TableBody>
          {infos.map((row, index) => (
            <TokenTableRow
              onDelete={onDelete}
              onAmountChange={onAmountChange}
              key={row.address + "_" + index}
              decimals={decimals}
              rowIndex={index}
              row={row}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------

type TokenTableRowProps = {
  row: AddressInfoItem;
  decimals: number;
  rowIndex: number;
  onAmountChange: (value: any, rowIndex: number) => void;
  onDelete: (rowIndex: number) => void;
};

function TokenTableRow({ row, decimals, rowIndex, onAmountChange, onDelete }: TokenTableRowProps) {
  const { address, balance = 0 } = row;
  const [innerValue, setInnerValue] = useState(row.amount);

  useEffect(() => {
    if (innerValue !== row.amount) {
      setInnerValue(row.amount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row.amount]);

  return (
    <TableRow>
      <TableCell>
        <CopyClipboard value={address}>
          {truncation(address)}
        </CopyClipboard>
      </TableCell>
      <TableCell>{Number(balance).toFixed(4)}</TableCell>
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
}