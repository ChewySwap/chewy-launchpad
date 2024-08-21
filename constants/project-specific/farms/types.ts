import { ChainId, ChainIdNum } from '@/constants/chain-specific'
import { Abi, Address } from 'viem'


// MasterChef Configuration
export type MasterChefConfig = {
    id: number
    name: string
    slug: string
    address: Address
    abi: Abi
    rewardToken: FarmTokenConfig
    rewardUsdPair?: Address
    rewardPerBlockFunction: string
    pendingFunction: string
    dex: DexConfig
    chainId: ChainIdNum
}

// Farm Token Configuration
export type FarmTokenConfig = {
    address: Address
    decimals: number
    symbol: string
    name: string
    logo?: string
    wethLpPair?: Address
    mainLpDex?: string
    socials?: SocialsConfig
    priceDecimals?: number
}

export type FarmTokenPriceData = {
    priceUsd?: number
    totalSupply?: number
    volumeUsd?: number
    marketCapUsd?: number
}

// Decentralized Exchange Configuration
export type DexConfig = {
    name: string
    slug: string
    url: string
    router: ContractConfig
    factory: ContractConfig
    lpName: string
    lpSymbol: string
    usdToken: FarmTokenConfig
    wethUsdPair: Address
    logo?: string
    addLpUrl?: string
    swapUrl?: string
}

// Contract Configuration
export type ContractConfig = {
    address: Address
    abi: Abi
}

// Farm Configuration
export type FarmConfig = {
    masterChefSlug?: string
    pid: number
    lpAddress: Address
    tokenA: FarmTokenConfig
    tokenB?: FarmTokenConfig
    quoteToken: FarmTokenConfig
    dex: DexConfig
    socials?: SocialsConfig
    priority?: number
    display?: "featured" | false
}


export interface Farm extends FarmConfig {

    chainId: ChainId | ChainIdNum
    tokenAmount?: number
    tokenA: FarmTokenConfig
    tokenB?: FarmTokenConfig
    quoteTokenAmount?: number
    lpTotalInQuoteToken?: number
    tokenPriceVsQuote?: number
    poolWeight?: number
    depositFeeBP?: number
    tokensPerLP?: number
    totalValue?: number
    quoteTokensPerLP?: number
    rewardPerBlock?: number
    apy?: number
    rewardPrice?: number
    nativePrice?: number
    isTokenOnly?: boolean
}

export type FarmRewardPrices = Record<number, FarmRewardData[]>;

export type FarmRewardData = {
    rewardContract: string;
    rewardPrice?: number | string;
};

export type NativeTokenPrices = Record<number, NativeData>;

type NativeData = {
    priceUsd: number;
    totalSupply?: number;
    volumeUsd?: number;
    marketCapUsd?: number;
}

export type Farms = Farm[]
export type ChainFarmData =  Record<ChainId, Farm[]>

export interface ChainFarmState {
data: ChainFarmData

}

// Socials Configuration
export type SocialsConfig = {
    website?: string
    twitter?: string
    discord?: string
    telegram?: string
    medium?: string
    github?: string
    facebook?: string
}

// Farm Section Configuration
export type FarmSectionConfig = {
    enabled: boolean
    title: string
    multichain: boolean
    multidex: boolean
    defaultChain: ChainId
    defaultChef: MasterChefConfig
    description: string
    chainIds: ChainId[]
    fallbackMasterchefSlug: string
    priceInTitle?: boolean
    priceToken?: FarmTokenConfig
}

export interface MasterChefWithRewardPrice extends MasterChefConfig {
    rewardPrice?: number;
}

export interface FarmWithStakedValue extends FarmConfig {
    apy?: number;
}

// Index Interfaces
export interface TokenIndex extends Record<string, FarmTokenConfig> { }
export interface SocialsIndex extends Record<string, SocialsConfig> { }
export interface FarmTokenList extends Record<ChainId, FarmTokenConfig[]> { }
export interface BlockchainMasterChefConfig extends Record<ChainId, MasterChefConfig[]> { }
export interface BlockchainFarmConfig extends Record<ChainId, FarmConfig[]> { }
