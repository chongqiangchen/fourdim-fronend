// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import { useAccount, useEnsName } from 'wagmi';
import { truncation } from "@/utils/truncation";
import Avatar from "@/components/Avatar";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

type Props = {
  isCollapse: boolean | undefined;
};

export default function NavbarAccount({ isCollapse }: Props) {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })


  return (
    <Link underline="none" color="inherit">
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <Avatar />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          {isConnected ? (
            <>
              {ensName && (
                <Typography variant="subtitle2" noWrap>
                  {ensName}
                </Typography>
              )}
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {truncation(address)}
              </Typography>
            </>
          ) : (
            <Typography variant="subtitle2" noWrap>
              请连接钱包
            </Typography>
          )}
        </Box>
      </RootStyle>
    </Link>
  );
}
