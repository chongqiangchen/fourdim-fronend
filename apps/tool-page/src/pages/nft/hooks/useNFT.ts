import { Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import { useSigner } from "wagmi";
import { NftContract } from "@fourdimtool/web3-core";

export interface nftHookProps {
  nftAddresses: string[];
  nftAbis?: any[];
  getTokenInfoFns?: ((tokenId: string, contract: Contract) => Promise<any>)[];
  getTokenInfosFns?: ((tokenIds: string[], contract: Contract) => Promise<any>)[];
}

const useNFT = (props?: nftHookProps) => {
  const { data: signer } = useSigner();
  const [loading, setLoading] = useState(false);
  const [nftInfos, setNftInfos] = useState<any[]>([]);
  const nftContracts = useRef<NftContract[]>([]);

  const {
    nftAddresses = [],
    nftAbis = [],
    getTokenInfoFns = [],
    getTokenInfosFns = []
  } = props || {};

  const nftAddressString = nftAddresses.map(item => item.toLowerCase()).join(",");

  const getNFTsTokenInfos = async () => {
    setLoading(true);
    const tokenInfos = await Promise.all(nftContracts.current.map(async (contract) => {
      return contract.getTokenInfos();
    }));
    setLoading(false);
    setNftInfos(tokenInfos);
    return tokenInfos;
  };

  useEffect(() => {
    if (signer && nftAddresses.length > 0) {
      nftContracts.current = nftAddresses.map((address, index) => {
        return new NftContract(
          signer,
          address,
          {
            abi: nftAbis[index],
            getTokenInfoFn: getTokenInfoFns[index],
            getTokenInfosFn: getTokenInfosFns[index]
          }
        );
      });

      getNFTsTokenInfos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, nftAddressString]);

  return {
    loading,
    data: nftInfos,
    reload: getNFTsTokenInfos
  };
};

export default useNFT;