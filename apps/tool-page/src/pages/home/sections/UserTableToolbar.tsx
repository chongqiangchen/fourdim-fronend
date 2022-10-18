import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
import Iconify from '../../../components/Iconify';
// components

// ----------------------------------------------------------------------

type Props = {
  optionsToken: Array<{value: string, label: string}>;
  filterName: string;
  filterToken: string;
  onFilterName: (value: string) => void;
  onFilterToken: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TokenListTableToolbar(
  {
    filterName,
    filterToken,
    onFilterName,
    onFilterToken,
    optionsToken,
  }: Props,
) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        select
        label='货币'
        value={filterToken}
        onChange={onFilterToken}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsToken.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder='搜索货币名称...'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
