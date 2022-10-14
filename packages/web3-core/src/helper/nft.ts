import { BigNumber, Contract, ethers } from "ethers";
import BaseContract from "./base";
import * as ABI from '@fourdimtool/web3-abi';
import { multicallv2 } from "fourdim-web3-hooks";

// @ts-ignore
const EmptyGetTokenInfosFn = async (tokenIds: any[], contract: Contract) => ([]);
const EmptyGetTokenInfoFn = async (tokenId: any, contract: Contract) => {
    const uri = await contract.tokenURI(tokenId);
    console.log(uri);
    return uri;
};

const DefaultOptions = {
    abi: ABI.ERC721,
    getTokenInfosFn: EmptyGetTokenInfosFn,
    getTokenInfoFn: EmptyGetTokenInfoFn,
}

class NftContract extends BaseContract {
    options = DefaultOptions;
    nftAddress: string;
    nftABI: any;

    constructor(
        signer: ethers.Signer | ethers.providers.Provider,
        address: string,
        options = DefaultOptions
    ) {
        super(address, options.abi || DefaultOptions.abi, signer);
        this.options = {
            abi: options.abi || ABI.ERC721,
            getTokenInfosFn: options.getTokenInfosFn || EmptyGetTokenInfosFn,
            getTokenInfoFn: options.getTokenInfoFn || EmptyGetTokenInfoFn,
        };
        this.nftAddress = address;
        this.nftABI = this.options.abi;
    }

    async getBalance(): Promise<BigNumber>
    async getBalance(address?: string): Promise<BigNumber> {
        if (this.signer instanceof ethers.providers.Provider) {
            return await this.contract.balanceOf(address);
        }
        // @ts-ignore
        const selfAddress = await this.signer.getAddress();
        return this.contract.balanceOf(selfAddress);
    }

    async getTokenInfo(tokenId: string) {
        return await this.options.getTokenInfoFn(tokenId, this.contract);
    }

    async getTokenIds() {
        if (this.signer instanceof ethers.providers.Provider) {
            throw new Error("Cannot get token infos from provider");
        }

        const balanceBN = await this.getBalance();
        const curAddress = await this.signer.getAddress();
        const tokenIdsCalls: any = [];

        for (let i = 0; i < Number(balanceBN); i++) {
            tokenIdsCalls.push({
                address: this.contract.address,
                name: "tokenOfOwnerByIndex",
                params: [curAddress, i]
            });
        }

        const tokenIdsResult = await multicallv2(this.nftABI, tokenIdsCalls, this.signer);
        return tokenIdsResult.map((result: any[]) => result[0]);
    }

    async getTokenInfos() {
        const tokenIds = await this.getTokenIds();
        return await this.options.getTokenInfosFn(tokenIds, this.contract);
    }

    async getOwnerOf(tokenId: string) {
        return await this.contract.ownerOf(tokenId);
    }
}

export default NftContract;