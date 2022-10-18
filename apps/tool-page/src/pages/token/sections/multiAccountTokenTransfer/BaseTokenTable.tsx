import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { KeyInfoItem } from "../../types/multi";
import useTable from "@/hooks/useTable";
import { TableHeadCustom } from "@/components/table";
import Iconify from "@/components/Iconify";
import { truncation } from "@/utils/truncation";
import CopyClipboard from "@/components/CopyClipboard";

const TABLE_HEAD = [
  { id: "address", label: "地址", width: 200 },
  { id: "balance", label: "余额" },
  { id: "amount", label: "归集金额", width: 160 },
  { id: "", label: "操作" }
];

interface Props {
  infos: KeyInfoItem[],
  decimals?: number,
  onAmountChange: (value: any, rowIndex: number) => void;
  onDelete: (rowIndex: number) => void;
}

export default function TokenTable(
  {
    infos,
    decimals = 18,
    onAmountChange,
    onDelete
  }: Props
) {
  const {
    page,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage
  } = useTable();

  return (
    <TableContainer>
      <Table>
        <TableHeadCustom headLabel={TABLE_HEAD} />

        <TableBody>
          {(rowsPerPage > 0
              ? infos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : infos
          ).map((row, index) => (
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

      <Box sx={{ position: "relative" }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={infos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Box>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------

type TokenTableRowProps = {
  row: KeyInfoItem;
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