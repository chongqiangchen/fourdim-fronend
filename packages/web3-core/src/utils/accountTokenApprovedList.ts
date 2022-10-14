import unionWith from "lodash/unionWith";
import { ERC20 } from "@fourdimtool/web3-abi";
import { ethers } from "ethers";
import { ERC20Parser } from '@fourdimtool/web3-parser';
import getContractFunctionByte4 from "./functionByte4";
import doAnalysisHistoryTx from "./txHistory";

const approveByte4 = getContractFunctionByte4('approve(address,uint256)');

function getAccountTokenApprovedList(provider: ethers.providers.Provider, address: string) {
    return doAnalysisHistoryTx(provider, address, analysisFn);
}

async function analysisFn(txs: any[], provider: ethers.providers.Provider, account: string) {
    const filterTxs = txs.filter(tx => tx.input && tx.input.startsWith(approveByte4));
    const uniqueTxs = unionWith(
        filterTxs,
        (pre, next) =>
            pre.to === next.to &&
            ERC20Parser.parseERC20('approve(address,uint256)', pre.input)[0] ===
            ERC20Parser.parseERC20('approve(address,uint256)', next.input)[0]
    );
    const addresses = uniqueTxs.map(tx => {
        const tokenAddress = tx.to;
        const spender = ERC20Parser.parseERC20('approve(address,uint256)', tx.input)[0];
        return [tokenAddress, spender];
    })

    const rqs = [];

    for (let i = 0; i < addresses.length; i++) {
        rqs.push(async () => {
            const contract = new ethers.Contract(addresses[i][0], ERC20, provider);
            let result = null;
            let decimals = null;
            let name = null;

            try {
                decimals = await contract.decimals();
            } catch (e) { }

            try {
                result = await contract.allowance(account, addresses[i][1]);
            } catch (e) { }

            try {
                name = await contract.name();
            } catch (e) { }

            return {
                token: addresses[i][0],
                spender: addresses[i][1],
                amount: result,
                name,
                decimals,
            };
        })
    }

    return await Promise.all(rqs.map(rq => rq()));
}

export default getAccountTokenApprovedList;
