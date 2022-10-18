import {
  Box,
  Card,
  Divider,
  FormControlLabel,
  Switch,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tabs
} from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSkeleton } from "@/components/table";
import useTable, { emptyRows, getComparator } from "@/hooks/useTable";
import { useRecoilValueLoadable } from "recoil";
import { AccountUsedTokenListQuery } from "@/atoms/account";
import { useEffect, useMemo, useState } from "react";
import useTabs from "@/hooks/useTabs";
import applySortFilter from "@/pages/home/utils/applySortFilter";
import TokenListTableRow from "@/pages/home/sections/UserTableRow";
import TokenListTableToolbar from "@/pages/home/sections/UserTableToolbar";

const STATUS_OPTIONS = ["全部"];

const TABLE_HEAD = [
  { id: "name", label: "货币名称", align: "left" },
  { id: "token", label: "货币地址", align: "left" },
  { id: "decimals", label: "货币精度", align: "left" },
  { id: "amount", label: "货币余额", align: "left" },
];

const UserTokenList = () => {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
    onChangeDense,
  } = useTable({
    defaultOrderBy: 'amount',
    defaultOrder: 'desc',
    defaultRowsPerPage: 10,
  });

  const info = useRecoilValueLoadable<any>(AccountUsedTokenListQuery);

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState("");

  const [filterToken, setFilterToken] = useState("all");

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs("全部");

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterToken = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterToken(event.target.value);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterToken
  });

  const optionTokens = useMemo(() => {
    return [{
      value: 'all',
      label: '全部',
    }].concat(tableData.map((item: any) => ({
      value: item.token,
      label: item.name
    })));
  }, [tableData])

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterToken) ||
    (!dataFiltered.length && !!filterStatus);

  const isLoading = info.state === 'loading';

  useEffect(() => {
    if (info.state === "hasValue") {
      setTableData(info.contents);
    }
  }, [info.contents, info.state])

  return (
    <Card>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={filterStatus}
        onChange={onChangeFilterStatus}
        sx={{ px: 2, bgcolor: "background.neutral" }}
      >
        {STATUS_OPTIONS.map((tab) => (
          <Tab disableRipple key={tab} label={tab} value={tab} />
        ))}
      </Tabs>

      <Divider />

      <TokenListTableToolbar
        filterName={filterName}
        filterToken={filterToken}
        onFilterName={handleFilterName}
        onFilterToken={handleFilterToken}
        optionsToken={optionTokens}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, position: "relative" }}>
          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              onSort={onSort}
            />

            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TokenListTableRow key={row.id} row={row} />
                ))}

              {isLoading && (
                <>
                  <TableSkeleton sx={{ height: denseHeight }} />
                  <TableSkeleton sx={{ height: denseHeight }} />
                  <TableSkeleton sx={{ height: denseHeight }} />
                  <TableSkeleton sx={{ height: denseHeight }} />
                </>
              )}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
              />

              <TableNoData isNotFound={!isLoading && isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box sx={{ position: "relative" }}>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />

        <FormControlLabel
          control={<Switch checked={dense} onChange={onChangeDense} />}
          label="Dense"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: "absolute" } }}
        />
      </Box>
    </Card>
  )
}

export default UserTokenList;



