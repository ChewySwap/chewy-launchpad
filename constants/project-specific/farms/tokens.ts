import { ChainId } from "@/constants/chain-specific/chains";
import { FarmTokenConfig, FarmTokenList, TokenIndex } from "./types";
import { SOCIALS } from "./socials";


export const SHIB_TOKENS: TokenIndex = {
    wbone:
    {
        address: "0xC76F4c819D820369Fb2d7C1531aB3Bb18e6fE8d8",
        decimals: 18,
        symbol: "BONE",
        name: "BONE",
        logo: "https://raw.githubusercontent.com/ChewySwap/chewy-tokenlist/main/tokens/bone.webp",
    },
    chewyswap:
    {
        address: "0x2761723006d3Eb0d90B19B75654DbE543dcd974f",
        decimals: 18,
        symbol: "CHEWY",
        name: "ChewySwap",
        logo: "https://raw.githubusercontent.com/ChewySwap/chewy-tokenlist/main/tokens/chewy.webp",
        socials: SOCIALS.chewyswap,
    },
    skullz:
    {
        address: "0x5212B42ef96A47Af93F3a6c801227b650EDEb12f",
        decimals: 18,
        symbol: "SKULLZ",
        name: "Sideshow 404",
        logo: "https://raw.githubusercontent.com/ChewySwap/chewy-tokenlist/main/tokens/skullz.webp",
        socials: SOCIALS.chewyswap,
    },
    knine:
    {
        address: "0x91fbB2503AC69702061f1AC6885759Fc853e6EaE",
        decimals: 18,
        symbol: "KNINE",
        name: "K9 Finance DAO",
        logo: "https://raw.githubusercontent.com/ChewySwap/chewy-tokenlist/main/tokens/knine.webp",
        socials: SOCIALS.chewyswap,
    },
    usdt:
    {
        address: "0xaB082b8ad96c7f47ED70ED971Ce2116469954cFB",
        decimals: 6,
        logo: "https://raw.githubusercontent.com/ChewySwap/chewy-tokenlist/main/tokens/usdt.webp",
        symbol: "USDT",
        name: "Tether USD",
    },
    bury: {
        address: "0x4FC2281639F9441F0Fcb8b6D922038277c4408c1",
        decimals: 18,
        symbol: "BURY",
        name: "Bury",
        logo: "https://raw.githubusercontent.com/ChewySwap/chewy-tokenlist/main/tokens/bury.webp",
        priceDecimals: 8,
    },
}