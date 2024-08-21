import { Address } from "viem"
import { DexConfig } from "../project-specific/farms/types"

export type TokenConfigType = {
    name: string
    address: Address
    symbol: string
    decimals: number
    baseCurrency?: TokenConfigType
    mainLpDex?: DexConfig
    logo?: string
    socials?: SocialsConfigType
  }
  export type SocialsConfigType = {
    website?: string
    twitter?: string
    discord?: string
    telegram?: string
    medium?: string
    github?: string
    facebook?: string
  }