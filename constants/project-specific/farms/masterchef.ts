import mcABI from "@/constants/abi/mcABI";
import heroMcAbi from "@/constants/abi/heroMcAbi";
import { BlockchainMasterChefConfig, MasterChefConfig } from "./types";
import { ChainId } from "@/constants/chain-specific/chains";
import { DEX_LIST } from "./dex";
import { SHIB_TOKENS } from "./tokens";

export const MASTERCHEFS_CONFIG: BlockchainMasterChefConfig = {
    [ChainId.SHIBARIUM]: [
        {
            id: 0,
            name: "Bury Farms",
            slug: "bury",
            address: "0x075653D0017e7aF0F9748DeED11d8e3b4551A7d7",
            abi: heroMcAbi,
            rewardToken: SHIB_TOKENS.bury,
            rewardUsdPair: "0x",
            rewardPerBlockFunction: "heroPerBlock",
            pendingFunction: "pendingHero",
            dex: DEX_LIST.chewyswap,
            chainId: 109,
        },
        {
            id: 1,
            name: "ChewySwap",
            slug: "chewyswap",
            address: "0x4c00f75F179F4A8208BC2ba3958Eb8d1C7986418",
            abi: mcABI,
            rewardToken: SHIB_TOKENS.chewyswap,
            rewardUsdPair: "0x",
            rewardPerBlockFunction: "chewyPerBlock",
            pendingFunction: "pendingChewy",
            dex: DEX_LIST.chewyswap,
            chainId: 109,
        }
    ]
}


export const MC = {
    chewy: MASTERCHEFS_CONFIG[ChainId.SHIBARIUM].find((mc) => mc.slug === "chewyswap"),
    bury: MASTERCHEFS_CONFIG[ChainId.SHIBARIUM].find((mc) => mc.slug === "bury"),
}