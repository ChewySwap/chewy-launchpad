import { FARM_PAGE_CONFIG } from "@/constants/project-specific/farms";
import { ChainId, chainSettings, fallbackChainId } from "@/constants/chain-specific";
import { FARMS_CONFIG } from "@/constants/project-specific/farms/pools";
import { readContracts } from '@wagmi/core';
import { getMasterChefConfigBySlug } from "@/util/contracts/masterchef";
import { chewyLpAbi } from "@/constants/abi/chewyLpAbi";
import { config as wagmiConfig } from '@/config/index';
import mcABI from "@/constants/abi/mcABI";
import { ChainFarmData, FarmRewardPrices, NativeTokenPrices } from "@/constants/project-specific/farms/types";

const farmChains = FARM_PAGE_CONFIG.chainIds;

const fetchFarms = async (rewardPrices: FarmRewardPrices, nativePrices: NativeTokenPrices): Promise<ChainFarmData> => {
    try {
        let chainData: ChainFarmData = {
            [farmChains[0]]: [],
        };

        await Promise.all(
            farmChains.map(async (farmChain: ChainId) => {
                const chainFarm = await Promise.all(
                    FARMS_CONFIG[farmChain].map(async (farmConfig) => {
                        const isTokenOnly = farmConfig.tokenB === undefined;

                        const mcConfig = getMasterChefConfigBySlug(farmConfig.masterChefSlug, farmChain) ?? FARM_PAGE_CONFIG.defaultChef;

                        const [
                            tokenBalanceLP,
                            quoteTokenBalanceLP,
                            lpTokenBalanceMC,
                            lpTotalSupply
                        ] = await readContracts(wagmiConfig, {
                            allowFailure: false,

                            contracts: [
                                {
                                    address: farmConfig.tokenA.address,
                                    abi: chewyLpAbi,
                                    functionName: 'balanceOf',
                                    args: [farmConfig.lpAddress],
                                    chainId: farmChain,
                                },
                                {
                                    address: farmConfig.tokenB?.address ?? farmConfig.quoteToken.address,
                                    abi: chewyLpAbi,
                                    functionName: 'balanceOf',
                                    args: [farmConfig.lpAddress],
                                    chainId: farmChain,
                                },
                                {
                                    address: isTokenOnly ? farmConfig.tokenA.address : farmConfig.lpAddress,
                                    abi: chewyLpAbi,
                                    functionName: 'balanceOf',
                                    args: [mcConfig.address],
                                    chainId: farmChain,
                                },
                                {
                                    address: farmConfig.lpAddress,
                                    abi: chewyLpAbi,
                                    functionName: 'totalSupply',
                                    chainId: farmChain,
                                },
                            ]
                        });

                        let tokenAmount;
                        let lpTotalInQuoteToken;
                        let tokenPriceVsQuote;
                        let lpTokenRatio;
                        let tokensPerLP = 0;
                        let quoteTokensPerLP = 0;
                        let quoteTokenAmount = 0;
                        let totalLiquidity = 0;

                        if (isTokenOnly) {
                            tokenAmount = Number(tokenBalanceLP) / (10 ** farmConfig.tokenA.decimals);
                            tokenPriceVsQuote = Number(quoteTokenBalanceLP / tokenBalanceLP);

                            if (farmConfig.tokenA.decimals !== 18) {
                                tokenPriceVsQuote = Number(quoteTokenBalanceLP / tokenBalanceLP) / (10 ** farmConfig.tokenA.decimals);
                            }

                            lpTotalInQuoteToken = tokenAmount * tokenPriceVsQuote;
                        } else {
                            lpTokenRatio = lpTokenBalanceMC / lpTotalSupply;
                            tokensPerLP = Number(tokenBalanceLP / lpTotalSupply);
                            quoteTokensPerLP = Number(quoteTokenBalanceLP / lpTotalSupply);
                            lpTotalInQuoteToken = (Number(quoteTokenBalanceLP) / (10 ** farmConfig.quoteToken.decimals)) * 2 * Number(lpTokenRatio);
                            tokenAmount = (Number(tokenBalanceLP) / (10 ** farmConfig.tokenA.decimals)) * Number(lpTokenRatio);
                            quoteTokenAmount = (Number(quoteTokenBalanceLP) / (10 ** farmConfig.quoteToken.decimals)) * Number(lpTokenRatio);

                            if (tokenAmount > 0) {
                                tokenPriceVsQuote = quoteTokenAmount / tokenAmount;
                            } else {
                                tokenPriceVsQuote = quoteTokenBalanceLP / tokenBalanceLP;
                            }
                        }

                        const [info, totalAllocPoint, rewardPerBlock] = await readContracts(wagmiConfig, {
                            allowFailure: false,
                            contracts: [
                                {
                                    address: mcConfig.address,
                                    abi: mcABI,
                                    functionName: 'poolInfo',
                                    args: [BigInt(farmConfig.pid)],
                                    chainId: farmChain,
                                },
                                {
                                    address: mcConfig.address,
                                    abi: mcABI,
                                    functionName: 'totalAllocPoint',
                                    chainId: farmChain,
                                },
                                {
                                    address: mcConfig.address,
                                    abi: mcConfig.abi,
                                    functionName: mcConfig.rewardPerBlockFunction,
                                    chainId: farmChain,
                                },
                            ]
                        });

                        const allocPoint = Number(info[2]);
                        const poolWeight = allocPoint / Number(totalAllocPoint);
                        const poolRewardPerBlock = (Number(rewardPerBlock) * Number(poolWeight)) / (10 ** 18);
                        const poolRewardPerYear = Number(poolRewardPerBlock) * chainSettings[farmChain].blocksPerYear;
                        const rewardPrice = Number(rewardPrices[farmChain].find((reward) => reward.rewardContract === mcConfig.rewardToken.address.toLowerCase())?.rewardPrice ?? 0);
                        const nativePrice = nativePrices[farmChain].priceUsd;
                        let apy = rewardPrice * poolRewardPerYear;
                        let totalValue = Number(lpTotalInQuoteToken) ?? 0;

                        if (farmConfig.quoteToken.address.toLowerCase() === chainSettings[farmChain].wNative.address.toLowerCase()) {
                            totalValue = totalValue * Number(nativePrices[farmChain].priceUsd);
                        }

                        if (totalValue > 0) {
                            apy = apy / totalValue;
                        }

                        return {
                            ...farmConfig,
                            chainId: farmChain,
                            tokenAmount: tokenAmount,
                            quoteTokenAmount,
                            lpTotalInQuoteToken,
                            tokenPriceVsQuote: Number(tokenPriceVsQuote),
                            poolWeight: Number(poolWeight),
                            depositFeeBP: info[4],
                            rewardPerBlock: poolRewardPerBlock,
                            tokensPerLP,
                            quoteTokensPerLP,
                            apy: apy,
                            totalValue,
                            rewardPrice,
                            nativePrice,
                            isTokenOnly,
                        };
                    })
                );

                chainData[farmChain] = chainFarm;
            })
        );


        return chainData;

    } catch (error) {
        console.error("Error fetching farms:", error);
        throw error;
    }
};

export default fetchFarms;