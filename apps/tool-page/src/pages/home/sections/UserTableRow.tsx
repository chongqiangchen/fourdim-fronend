// @mui
import { TableRow, TableCell, Typography } from "@mui/material";
import { truncation } from "@/utils/truncation";
import { formatTokenPrice } from "@/utils/formatBigNumber";
import CopyClipboard from "@/components/CopyClipboard";
// @types

// ----------------------------------------------------------------------

type Props = {
  row: any;
};

export default function TokenListTableRow({ row }: Props) {
  const {
    name,
    token,
    decimals,
    amount
  } = row;

  // const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  //
  // const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setOpenMenuActions(event.currentTarget);
  // };
  //
  // const handleCloseMenu = () => {
  //   setOpenMenuActions(null);
  // };

  return (
    <TableRow hover>
      <TableCell align="left">
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <CopyClipboard value={token}>
          {truncation(token)}
        </CopyClipboard>
      </TableCell>

      <TableCell align="left" sx={{ textTransform: "capitalize" }}>
        {decimals}
      </TableCell>

      <TableCell align="left">
        {formatTokenPrice(amount, decimals)}
      </TableCell>

      {/*<TableCell align="right">*/}
      {/*  <TableMoreMenu*/}
      {/*    open={openMenu}*/}
      {/*    onOpen={handleOpenMenu}*/}
      {/*    onClose={handleCloseMenu}*/}
      {/*    actions={*/}
      {/*      <>*/}
      {/*        <MenuItem*/}
      {/*          onClick={() => {*/}
      {/*            handleCloseMenu();*/}
      {/*          }}*/}
      {/*          sx={{ color: "error.main" }}*/}
      {/*        >*/}
      {/*          <Iconify icon={"eva:trash-2-outline"} />*/}
      {/*          Delete*/}
      {/*        </MenuItem>*/}
      {/*        <MenuItem*/}
      {/*          onClick={() => {*/}
      {/*            handleCloseMenu();*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <Iconify icon={"eva:edit-fill"} />*/}
      {/*          Edit*/}
      {/*        </MenuItem>*/}
      {/*      </>*/}
      {/*    }*/}
      {/*  />*/}
      {/*</TableCell>*/}
    </TableRow>
  );
}
