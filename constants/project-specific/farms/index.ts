import { ChainId } from "@/constants/chain-specific/chains";
import { MASTERCHEFS_CONFIG } from "./masterchef";
import { FarmSectionConfig } from "./types";
import { SHIB_TOKENS } from "./tokens";


export const FARM_PAGE_CONFIG: FarmSectionConfig = {
    enabled: false,
    title: "Chewy Launchpad",
    multichain: false,
    multidex: true,
    priceInTitle: true,
    priceToken: SHIB_TOKENS.chewy,
    defaultChain: ChainId.SHIBARIUM,
    defaultChef: MASTERCHEFS_CONFIG[109][1],
    description: "",
    chainIds: [ChainId.SHIBARIUM],
    fallbackMasterchefSlug: "chewyswap",
}