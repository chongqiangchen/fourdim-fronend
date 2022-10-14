import { ethers } from 'ethers';
import axios from 'axios';

const BSCSCAN_API_KEY = 'SAAH251VW4NUF8896VUYYXYZ8F5VMA477G';

function getHistoryTxList(
  apiKey: string,
  address: string,
  startBlock: number,
  endBlock: number,
  page: number,
  offset: number,
) {
  return axios
    .get(`https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=desc&apikey=${apiKey}`)
    .then(res => {
      if (res.data.status === '1') {
        return res.data.result;
      } else {
        return [];
      }
    });
}

export default async function doAnalysisHistoryTx(
  provider: ethers.providers.Provider,
  account: string,
  analysisFn: any,
  apiKey = BSCSCAN_API_KEY,
) {
  const count = await provider.getTransactionCount(account);
  const groupCount = Math.ceil(Number(count) / 5000);
  const txs = [];
  for (let i = 1; i <= groupCount; i++) {
    const txList = await getHistoryTxList(apiKey, account, 0, 99999999, i, 5000);
    const analysisList = await analysisFn(txList, provider, account);
    txs.push(...analysisList);
  }

  return txs;
}