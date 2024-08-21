import { FARM_PAGE_CONFIG } from "@/constants/project-specific/farms";
import { Address } from 'viem';
import { ChainId, chainSettings } from '@/constants/chain-specific/chains';
import { DexConfig } from "@/constants/project-specific/farms/types";

export const getAddLiquidityUrl = (
    dex: DexConfig,
    chainId: ChainId = FARM_PAGE_CONFIG.defaultChain,
    tokenA: Address | string,
    tokenB: Address | string
): string => {
    // const base = dex.addLpUrl ?? dex.url;
    // const queryParams = dex.slug === 'chewyswap' ? `?step=1&chain=${chainId.toString().toLowerCase()}` : '';
    const _tokenA = tokenA === chainSettings[chainId].wNative.address ? chainSettings[chainId].nativeCurrency.symbol : tokenA;
    const _tokenB = tokenB === chainSettings[chainId].wNative.address ? chainSettings[chainId].nativeCurrency.symbol : tokenB;

    const lpUrl = new URL(`${dex.addLpUrl ?? dex.url}${_tokenA}${_tokenB && `/${_tokenB}`}`);
    lpUrl.searchParams.set('step', '1');
    lpUrl.searchParams.set('chain', chainId.toString().toLowerCase())
    return lpUrl.toString();
}