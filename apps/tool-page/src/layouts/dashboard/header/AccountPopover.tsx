import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Button } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName, useNetwork, useSwitchNetwork } from 'wagmi';
import Avatar from "@/components/Avatar";
import { truncation } from "@/utils/truncation";

// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: 'Home',
//     linkTo: '/',
//   },
//   {
//     label: 'Profile',
//     linkTo: '/',
//   },
//   {
//     label: 'Settings',
//     linkTo: '/',
//   },
// ];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const { chain } = useNetwork()
  const { chains, pendingChainId, isLoading: switchNetworkLoading, switchNetwork } = useSwitchNetwork()

  const { address, isConnected } = useAccount()
  // const { data: ensAvatar } = useEnsAvatar({ addressOrName: address })
  const { data: ensName } = useEnsName({ address })

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleConnect = (x: any) => {
    connect(x)
    handleClose()
  }

  return (
    <>
      {isConnected ? (
        <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar />
      </IconButtonAnimate>
      ) : (
        <Button onClick={handleOpen}>连接钱包</Button>
      )}

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
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

          {
            chain?.unsupported ? (
              <Typography variant="subtitle2" noWrap>
                当前网络不支持
              </Typography>
            ) : (
              <Typography variant="subtitle2" noWrap>
                当前网络: {chain?.name}
              </Typography>
            )
          }
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {
          isConnected ? (
            <>
              {switchNetwork && (
                chains.map((x: any) =>
                  x.id === chain?.id ? null : (
                    <MenuItem
                      disabled={!switchNetwork || x.id === chain?.id}
                      key={x.id}
                      onClick={() => switchNetwork?.(x.id)}
                    >
                      {x.name}
                      {switchNetworkLoading && x.id === pendingChainId && ' (切换中)'}
                    </MenuItem>
                  ),
                )
              )}
              <Divider sx={{ borderStyle: 'dashed' }} />
              <MenuItem sx={{ m: 1 }} onClick={() => disconnect()}>断开连接</MenuItem>
            </>
          ) : (
            <Stack sx={{ p: 1 }}>
              {
                connectors
                  .map((x) => (
                    <MenuItem disabled={!x.ready} key={x.id} onClick={() => connect({ connector: x })}>
                      {x.name}
                      {!x.ready && " (不支持)"}
                      {isLoading && x.id === pendingConnector?.id && ' (连接中)'}
                    </MenuItem>
                  ))
              }
            </Stack>
          )
        }
      </MenuPopover>
    </>
  );
}
