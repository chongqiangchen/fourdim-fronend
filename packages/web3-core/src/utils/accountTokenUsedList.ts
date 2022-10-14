import { ethers } from "ethers";
import { UniswapV2Parser } from "@fourdimtool/web3-parser";
import unionWith from "lodash/unionWith";
import doAnalysisHistoryTx from "./txHistory";
import { ERC20 } from '@fourdimtool/web3-abi';


function getAccountTokenUsedList(provider: ethers.providers.Provider, address: string) {
    return doAnalysisHistoryTx(provider, address, analysisFn);
}

function checkTokenInTxInputWithUniswap(tx: any) {
    let parseTx;

    try {
        parseTx = UniswapV2Parser.parseUniswapV2Router('swapETHForExactTokens', tx.input);
    } catch (e) { }

    try {
        parseTx = UniswapV2Parser.parseUniswapV2Router('swapExactETHForTokens', tx.input);
    } catch (e) { }

    try {
        parseTx = UniswapV2Parser.parseUniswapV2Router('swapExactETHForTokensSupportingFeeOnTransferTokens', tx.input);
    } catch (e) { }

    try {
        parseTx = UniswapV2Parser.parseUniswapV2Router('swapExactTokensForETH', tx.input);
    } catch (e) { }

    try {
        parseTx = UniswapV2Parser.parseUniswapV2Router('swapExactTokensForETHSupportingFeeOnTransferTokens', tx.input);
    } catch (e) { }

    try {
        parseTx = UniswapV2Parser.parseUniswapV2Router('swapExactTokensForTokens', tx.input);
    } catch (e) { }

    try {
        parseTx = UniswapV2Parser.parseUniswapV2Router('swapExactTokensForTokensSupportingFeeOnTransferTokens', tx.input);
    } catch (e) { }

    try {
        parseTx = UniswapV2Parser.parseUniswapV2Router('swapTokensForExactETH', tx.input);
    } catch (e) { }

    try {
        parseTx = UniswapV2Parser.parseUniswapV2Router('swapTokensForExactTokens', tx.input);
    } catch (e) { }

    if (parseTx) {
        return [...parseTx.path];
    } else {
        return [];
    }
}

async function analysisFn(txs: any[], provider: ethers.providers.Provider, account: string) {
    const addresses = [];

    for (const tx of txs) {
        const tokenAddressesFromInput = checkTokenInTxInputWithUniswap(tx);
        addresses.push(...tokenAddressesFromInput);
    }

    // unique addresses
    const uniqueAddresses = unionWith(addresses, (a, b) => {
        return a.toLowerCase() === b.toLowerCase();
    });

    const rqs = [];
    for (let i = 0; i < uniqueAddresses.length; i++) {
        rqs.push(async () => {
            const contract = new ethers.Contract(uniqueAddresses[i], ERC20, provider);
            let amount = null;
            let decimals = null;
            let name = null;

            try {
                amount = await contract.balanceOf(account);
            } catch (e) { }

            try {
                decimals = await contract.decimals();
            } catch (e) {
            }

            try {
                name = await contract.name();
            } catch (e) {
            }

            return {
                token: uniqueAddresses[i],
                amount,
                name,
                decimals,
            };
        })
    }
    return await Promise.all(rqs.map(rq => rq()));
}

export default getAccountTokenUsedList;