import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TextField } from "@mui/material";
import { uniqueId } from "lodash";
import { TableHeadCustom } from "src/components/table";
import useTable from "src/hooks/useTable";

const TABLE_HEAD = [
    { 
        id: 'address', 
        label: '地址',
        width: 200,
    },
    { 
        id: 'balance', 
        label: '余额',
    },
    { 
        id: 'amount', 
        label: '归集金额', 
        width: 160
    },
    { 
        id: '', 
        label: '操作'
    },
];

interface Props {
    data: any[],
    columns: any[],
}

export default function NftTable({data}: Props) {
    const {
        page,
        rowsPerPage,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable();

    return (
        <TableContainer>
            <Table>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                    {(rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data
                    ).map((row, index) => (
                        <TokenTableRow
                            columns={TABLE_HEAD}
                            key={uniqueId()}
                            rowIndex={index}
                            row={row}
                        />
                    ))}
                </TableBody>
            </Table>

            <Box sx={{ position: 'relative' }}>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
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
    row: any;
    rowIndex: number;
    columns: any[];
};

function TokenTableRow({ row, rowIndex, columns }: TokenTableRowProps) {

    const InnerCell = (column: any) => {
        const value = row[column.id];

        if (column.render) {
            return column.render(value, row);
        }

        return (
            <>{value}</>
        )
    }

    return (
        <TableRow>
            {columns.map((column) => {
                return (
                    <TableCell key={column.key ? row[column.key] : uniqueId()}>
                        <InnerCell column={column} />
                    </TableCell>
                )
            })}
        </TableRow>
    )
}