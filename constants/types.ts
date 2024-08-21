import type { FC, PropsWithChildren } from 'react'
import { PoolId } from './project-specific'
import { Address } from 'viem'
import { ChainId } from './'

// biome-ignore lint/complexity/noBannedTypes: FIXME
export type ComponentWithChildren<P extends {} = {}> = FC<PropsWithChildren<P>>

export type BatchSettings = {
  maxBatchClaim: number
  maxBatchStake: number
  maxBatchUnstake: number
}

export type CurrentNftPoolType = {
  poolId: number
  chainId: ChainId
}


type ChainIdType = keyof typeof ChainId

export interface BaseNftNftPoolConfig {
  pid: number
  name: string
  imgFolder?: string
  contractType?: "thirdweb" | undefined,
  address: Address
  marketplaces?: Array<{
    name: string
    url: string
    logo?: string
  }>
  market1: string
  market2?: string
  isWrapped?: boolean
  nftAddress: Address
  nftMaxSupply: number
  nftSymbol: string
  nftName: string
  nftUri: string
  nftExt: string
  nftMaxMint?: number
  rewardSymbol: string
  rewardName: string
  rewardLogo: string
  rewardAddress: Address
  rewardPair: Address
  rewardDecimals: number
  rewardDecimalPlaces: number
  rewardPriceDecimalPlaces: number
  aboutTitle1: string
  aboutContent1: string
  aboutTitle2: string
  aboutContent2: string
  // Other properties that are common and not dependent on is404
}

// Interface for Pools which implement staking DN404 for DN404
export interface NftPoolConfigWith404 extends BaseNftNftPoolConfig {
  is404: true
  _404Pair?: Address // Optional when is404 is true
  _404Token: Address
  _404RewardAddress: Address
  _404TokenDecimals: number
  // Other properties specific to when is404 is true
}

// Interface for Pools which do not implement DN404 Rewards
export interface NftPoolConfigWithout404 extends BaseNftNftPoolConfig {
  is404?: false
}

// Base NftPoolConfig type
export type NftPoolConfigType = NftPoolConfigWith404 | NftPoolConfigWithout404

// NftPoolConfig Interface for
export interface NftPoolConfig {
  pid: number
  name: string
  imgFolder?: string
  contractType?: "thirdweb" | undefined,
  address: Address
  marketplaces?: Array<{
    name: string
    url: string
    logo?: string
  }>
  market1: string
  market2?: string
  is404?: boolean
  _404Pair: Address
  _404Token: Address
  _404RewardAddress: Address
  isWrapped: boolean
  _404TokenDecimals: number
  nftAddress: Address
  nftMaxSupply: number
  nftSymbol: string
  nftName: string
  nftUri: string
  nftExt: string
  nftMaxMint?: number
  rewardSymbol: string
  rewardName: string
  rewardLogo: string
  rewardAddress: Address
  rewardPair: Address
  rewardDecimals: number
  rewardDecimalPlaces: number
  rewardPriceDecimalPlaces: number
  aboutTitle1: string
  aboutContent1: string
  aboutTitle2: string
  aboutContent2: string
}

export interface BlockchainNftPoolConfig
  extends Record<ChainId, Partial<Record<PoolId, NftPoolConfigType>>> {}

export interface BlockchainTokens extends Record<ChainId, Address> {}

export interface BlockchainExplorers extends Record<ChainId, String> {}
