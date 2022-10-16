import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel, Stack,
} from '@mui/material';
import useTable, { emptyRows, getComparator } from '../../hooks/useTable';
import useSettings from '../../hooks/useSettings';
import useTabs from '../../hooks/useTabs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import { UserTableRow, UserTableToolbar } from './sections';
import Analytic from '../../components/Analytic';
import sumBy from 'lodash/sumBy';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'company', label: 'Company', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'isVerified', label: 'Verified', align: 'center' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();
  const theme = useTheme();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row: any) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = tableData.filter((row: any) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id: string) => {
    // navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  return (
    <Page title='User: List'>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/*<HeaderBreadcrumbs*/}
        {/*  heading='User List'*/}
        {/*  links={[*/}
        {/*    { name: 'Dashboard', href: PATH_DASHBOARD.root },*/}
        {/*    { name: 'User', href: PATH_DASHBOARD.user.root },*/}
        {/*    { name: 'List' },*/}
        {/*  ]}*/}
        {/*  action={*/}
        {/*    <Button*/}
        {/*      variant='contained'*/}
        {/*      component={RouterLink}*/}
        {/*      to={PATH_DASHBOARD.user.new}*/}
        {/*      startIcon={<Iconify icon={'eva:plus-fill'} />}*/}
        {/*    >*/}
        {/*      New User*/}
        {/*    </Button>*/}
        {/*  }*/}
        {/*/>*/}

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <Analytic
                title="Total"
                total={tableData.length}
                percent={100}
                price={sumBy(tableData, 'totalPrice')}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              {/*<Analytic*/}
              {/*  title="Paid"*/}
              {/*  total={getLengthByStatus('paid')}*/}
              {/*  percent={getPercentByStatus('paid')}*/}
              {/*  price={getTotalPriceByStatus('paid')}*/}
              {/*  icon="eva:checkmark-circle-2-fill"*/}
              {/*  color={theme.palette.success.main}*/}
              {/*/>*/}
              {/*<Analytic*/}
              {/*  title="Unpaid"*/}
              {/*  total={getLengthByStatus('unpaid')}*/}
              {/*  percent={getPercentByStatus('unpaid')}*/}
              {/*  price={getTotalPriceByStatus('unpaid')}*/}
              {/*  icon="eva:clock-fill"*/}
              {/*  color={theme.palette.warning.main}*/}
              {/*/>*/}
              {/*<Analytic*/}
              {/*  title="Overdue"*/}
              {/*  total={getLengthByStatus('overdue')}*/}
              {/*  percent={getPercentByStatus('overdue')}*/}
              {/*  price={getTotalPriceByStatus('overdue')}*/}
              {/*  icon="eva:bell-fill"*/}
              {/*  color={theme.palette.error.main}*/}
              {/*/>*/}
              {/*<Analytic*/}
              {/*  title="Draft"*/}
              {/*  total={getLengthByStatus('draft')}*/}
              {/*  percent={getPercentByStatus('draft')}*/}
              {/*  price={getTotalPriceByStatus('draft')}*/}
              {/*  icon="eva:file-fill"*/}
              {/*  color={theme.palette.text.secondary}*/}
              {/*/>*/}
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant='scrollable'
            scrollButtons='auto'
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row: any) => row.id),
                    )
                  }
                  actions={
                    <Tooltip title='Delete'>
                      <IconButton color='primary' onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row: any) => row.id),
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.name)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label='Dense'
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter(
  {
    tableData,
    comparator,
    filterName,
    filterStatus,
    filterRole,
  }: {
    tableData: any[];
    comparator: (a: any, b: any) => number;
    filterName: string;
    filterStatus: string;
    filterRole: string;
  },
) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1,
    );
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item: Record<string, any>) => item.status === filterStatus);
  }

  if (filterRole !== 'all') {
    tableData = tableData.filter((item: Record<string, any>) => item.role === filterRole);
  }

  return tableData;
}
