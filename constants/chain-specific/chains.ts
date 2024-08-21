import { chains } from "@/config/index";
import { BlockchainExplorers, BlockchainTokens } from "../types";
import { ChainSettingsRecord } from "./types";

// EVM Chain Id's Supported by Staking Dapp
export enum ChainId {
    SHIBARIUM = 109,
    // Add more Chain ID's as necessary
}
export type ChainIdNum = typeof chains[number]['id'];

export const chainSettings: ChainSettingsRecord = {
    [ChainId.SHIBARIUM]: {
        chainId: 109,
        chainName: 'Shibarium',
        chainSlug: 'shibarium',
        nativeCurrency: {
            name: 'BONE',
            symbol: 'BONE',
            decimals: 18
        },
        wNative: {
            name: 'Wrapped BONE',
            symbol: 'WBONE',
            address: '0xC76F4c819D820369Fb2d7C1531aB3Bb18e6fE8d8',
            decimals: 18,
            logo: 'https://raw.githubusercontent.com/ChewySwap/chewy-tokenlist/main/tokens/wbone.png',
        },
        nativePriceEndpoints: {
            geckoterminal: 'https://api.geckoterminal.com/api/v2/networks/eth/tokens/0x9813037ee2218799597d83d4a5b6f3b6778218d9/',
        },
        tokenPriceEndpoints: {
            geckoterminal: 'https://api.geckoterminal.com/api/v2/simple/networks/shibarium/token_price/',
        },
        nativeApiSetting: {
            network: 'eth',
            address: '0x9813037ee2218799597d83d4a5b6f3b6778218d9'
        },
        tokenApiSetting: {
            network: 'shibarium'
        },
        multicall: '0xB585B461950c4A684aDB06f8F03eB1c3410ED2c5',
        rpcUrls: ['https://rpc.shibarium.io'],
        blockExplorerUrl: 'https://www.shibariumscan.io',
        blockTime: 5,
        blocksPerYear: 31536000 / 5,
    }
    // Add more Chain ID's as necessary
}


export const fallbackChainId = ChainId.SHIBARIUM

export const fallbackChainName = 'Shibarium'

export const explorerUrl: BlockchainExplorers = {
    [ChainId.SHIBARIUM]: 'https://www.shibariumscan.io'
    // Add more Chain ID's as necessary
}

export const wethAddresses: BlockchainTokens = {
    [ChainId.SHIBARIUM]: '0xC76F4c819D820369Fb2d7C1531aB3Bb18e6fE8d8'
    // Add more Chain ID's as necessary
}

export const multicallAddress: BlockchainTokens = {
    [ChainId.SHIBARIUM]: '0xB585B461950c4A684aDB06f8F03eB1c3410ED2c5'
    // Add more Chain ID's as necessary
}