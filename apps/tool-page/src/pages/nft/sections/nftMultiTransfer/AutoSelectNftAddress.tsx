import { Autocomplete, Chip, TextField } from "@mui/material";
import uniqueId from "lodash/uniqueId";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { NftAddresState } from "@/atoms/nft/nftMultiTransfer";
import { COMMON_NFT_NAME, COMMON_NFT_NAME_AND_HELPER_MAP, SUGGESTION_LIST } from "@/helper/nft";
import { NftHelper } from "@/pages/token/types/nft";

const AutoSelectNftAddress = () => {
  const [autoValue, setAutoValue] = useState<string[]>([]);
  const [_, setNftAddress] = useRecoilState(NftAddresState);

  const OptionTitles: string[] = SUGGESTION_LIST.map((option) => option.title);
  const hasValue = autoValue.length > 0;

  const handleChangeNftAddress = (value: string[]) => {
    const firstValue = value[0];

    if (hasValue) {
      if (OptionTitles.includes(firstValue)) {
        return;
      } else {
        const lastValue = value[value.length - 1];
        if (OptionTitles.includes(lastValue)) {
          return;
        }
      }
    }

    setAutoValue(value);
    updateNftAddress(value);
  };

  const updateNftAddress = (newValue: string[]) => {
    const firstValue = newValue[0];
    let result: NftHelper = {
      nftAddresses: newValue,
      getTokenInfosFns: [],
      networkId: 56,
      tableColumns: []
    };

    if (OptionTitles.includes(firstValue)) {
      result = COMMON_NFT_NAME_AND_HELPER_MAP[firstValue as COMMON_NFT_NAME].helper as NftHelper;
    }

    setNftAddress(result);
  };

  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={OptionTitles}
      value={autoValue}
      freeSolo
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            key={uniqueId()}
          />
        ))
      }
      onChange={(e, value) => handleChangeNftAddress(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="NFT地址"
        />
      )}
    />
  );
};

export default AutoSelectNftAddress;