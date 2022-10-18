import { ReactNode, useState } from 'react';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// @mui
import { Tooltip, TextField, IconButton, InputAdornment, Box, Theme, SxProps } from '@mui/material';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

type Props = {
  value: string;
  canEditor?: boolean;
  children?: ReactNode;
  sx?: SxProps<Theme>
};

export default function CopyClipboard({ value, canEditor = false, children, sx, ...other }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    value,
    copied: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ value: event.target.value, copied: false });
  };

  const onCopy = () => {
    setState({ ...state, copied: true });
    if (state.value) {
      enqueueSnackbar('Copied!');
    }
  };

  if (!canEditor) {
    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...sx,
        }}
        {...other}
      >
        {children || value}
        <Box sx={{ ml: 1 }}>
          <CopyToClipboard text={state.value} onCopy={onCopy}>
            <Tooltip title="Copy">
              <IconButton>
                <Iconify icon={'eva:copy-fill'} width={24} height={24} />
              </IconButton>
            </Tooltip>
          </CopyToClipboard>
        </Box>
      </Box>
    )
  }

  return (
    <TextField
      fullWidth
      value={state.value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CopyToClipboard text={state.value} onCopy={onCopy}>
              <Tooltip title="Copy">
                <IconButton>
                  <Iconify icon={'eva:copy-fill'} width={24} height={24} />
                </IconButton>
              </Tooltip>
            </CopyToClipboard>
          </InputAdornment>
        ),
      }}
      sx={sx}
      {...other}
    />
  );
}
