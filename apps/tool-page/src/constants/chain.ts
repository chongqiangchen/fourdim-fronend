import { Chain } from "wagmi";

type ChainName =
    | 'bsc'
    | 'bscTestnet'


export const ChainMap: Record<ChainName, Chain> = {
    bsc: {
        id: 56,
        name: 'BSC',
        network: 'bsc',
        nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
        rpcUrls: {
            dataseed1: 'https://bsc-dataseed1.binance.org', 
            dataseed2: 'https://bsc-dataseed2.binance.org',
            default: 'https://bsc-dataseed1.binance.org'
        },
        blockExplorers: {
            etherscan: {
                name: 'Bscscan',
                url: 'https://bscscan.io',
            },
            bscscan: {
                name: 'Bscscan',
                url: 'https://bscscan.io',
            },
            default: {
                name: 'Bscscan',
                url: 'https://bscscan.io',
            }
        },
    },
    bscTestnet: {
        id: 97,
        name: 'Testnet BSC',
        network: 'bscTestnet',
        testnet: true,
        nativeCurrency: { name: "TBNB", symbol: "TBNB", decimals: 18 },
        rpcUrls: {
            default: "https://data-seed-prebsc-1-s1.binance.org:8545",
        },
        blockExplorers: {
            etherscan: {
                name: "Testnet Bscscan",
                url: "https://testnet.bscscan.com/"
            },
            default: {
                name: "Testnet Bscscan",
                url: "https://testnet.bscscan.com/"
            }
        },
    }
}

export const Chains: Chain[] = [
    ChainMap.bsc,
    ChainMap.bscTestnet
]