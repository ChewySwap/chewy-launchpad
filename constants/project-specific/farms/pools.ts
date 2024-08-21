import { ChainId } from "@/constants/chain-specific";
import { BlockchainFarmConfig } from "./types";
import { SHIB_TOKENS } from "./tokens";
import { SOCIALS } from "./socials";
import { DEX_LIST } from "./dex";

const chewyDex = DEX_LIST.chewyswap;

export const FARMS_CONFIG: BlockchainFarmConfig = {
    [ChainId.SHIBARIUM]: [
        {
            pid: 18,
            masterChefSlug: "chewyswap",
            lpAddress: "0xF3452bCdEcaDa5E08ce56EC3D2BF8e35ECFFFF91",
            tokenA: SHIB_TOKENS.knine,
            tokenB: SHIB_TOKENS.wbone,
            quoteToken: SHIB_TOKENS.wbone,
            priority: 100,
            display: "featured",
            dex: chewyDex,
        },
        {
            pid: 0,
            masterChefSlug: "bury",
            lpAddress: "0x18da641361250942ef13987f381bf9185c968a55",
            tokenA: SHIB_TOKENS.bury,
            tokenB: SHIB_TOKENS.wbone,
            quoteToken: SHIB_TOKENS.wbone,
            priority: 100,
            display: "featured",
            socials: SOCIALS.chewyswap,
            dex: chewyDex,
        },
        {
            pid: 2,
            masterChefSlug: "chewyswap",
            lpAddress: "0x324EEf33AF720cE44DEAB7e32F4367a82b4eA43b",
            tokenA: SHIB_TOKENS.chewyswap,
            tokenB: SHIB_TOKENS.wbone,
            quoteToken: SHIB_TOKENS.wbone,
            priority: 100,
            display: "featured",
            dex: chewyDex,
        },
        {
            pid: 14,
            masterChefSlug: "chewyswap",
            lpAddress: "0xFB7cC7bD5Bca846B1B7a9077365F0513585c4B91",
            tokenA: SHIB_TOKENS.skullz,
            tokenB: SHIB_TOKENS.wbone,
            quoteToken: SHIB_TOKENS.wbone,
            priority: 100,
            display: "featured",
            dex: chewyDex,
        },
    ]
}