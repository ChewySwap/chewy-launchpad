import { Address } from "viem"
import { TokenConfigType } from "../types/currency"
import { ChainId } from "./chains"


export type GeckoApiTokenSettings = {
    network: string
    address: string | Address
}

export type GeckoApiSettings = {
    network: string
}
export type ChainSettingType = {
    chainId: number
    chainName: string
    chainSlug: string
    nativeCurrency: {
        name: string
        symbol: string
        decimals: number
    }
    blocksPerYear: number
    blockTime: number
    wNative: TokenConfigType
    nativePriceEndpoints: {
        geckoterminal: string
    }
    nativeApiSetting: GeckoApiTokenSettings
    tokenApiSetting: GeckoApiSettings
    tokenPriceEndpoints: {
    geckoterminal: string
}
multicall ?: string
rpcUrls: string[]
blockExplorerUrl: string
}
export type ChainSettingsRecord = Record<ChainId, ChainSettingType>