import { ChainId } from "@/constants/chain-specific"
import { MASTERCHEFS_CONFIG } from "./masterchef"
import { DexConfig } from "./types"
import { tokenAbi } from "@/constants/abi"
import { chewyRouterAbi } from "@/constants/abi/chewyRouterAbi"
import { chewyFactoryAbi } from "@/constants/abi/chewyFactoryAbi"

type DexConfigListType = Record<string, DexConfig>

export const DEX_LIST: DexConfigListType = {
    chewyswap: {
        name: "ChewySwap",
        slug: "chewyswap",
        url: "https://chewyswap.dog",
        router: {
            address: "0x2875F2D86d83635A859029872e745581530cEec7",
            abi: chewyRouterAbi
        },
        factory: {
            address: "0xEDedDbde5ffA62545eDF97054edC11013ED72125",
            abi: chewyFactoryAbi
        },
        lpName: "Chewy LPs",
        lpSymbol: "ChewyLP",
        logo: "https://chewyswap.dog/logo.png",
        addLpUrl: "https://chewyswap.dog/add/",
        swapUrl: "https://chewyswap.dog/swap/",
        wethUsdPair: "0xB69A4132af7495aE809Ce0155b7be1889ef72918",
        usdToken: {
            address: "0xaB082b8ad96c7f47ED70ED971Ce2116469954cFB",
            decimals: 6,
            symbol: "USDT",
            name: "Tether USD",
        }
    },
}