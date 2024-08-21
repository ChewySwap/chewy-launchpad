import { useEffect, useState } from "react";
import { Address, formatEther, formatUnits } from "viem";
import { useReadContracts, useAccount } from "wagmi";
import { getPoolSettings } from "../util";
import { usdContract, fallbackChainId, wethUsdPair, wethContract as wethContractAddress } from "../constants";
import { ChainId, NftPoolConfig, POOL_CONFIG, PoolId, multicallAddress } from "../constants";

import { tokenAbi } from "../constants/abi";


/**
 * Custom hook to fetch and calculate token prices for a given pool.
 *
 * @param poolId - The ID of the pool.
 * @returns An object containing the bone price, reward price, dn404 price, and a refresh function.
 */
export function useTokenPrice(poolId: PoolId | number) {
    const [dn404Price, setDn404Price] = useState<number>(0);
    const [bonePrice, setBonePrice] = useState<number>(0);
    const [rewardPrice, setRewardPrice] = useState<number>(0);
    const { chainId } = useAccount();
    const currPool: NftPoolConfig = getPoolSettings(chainId ?? 109, poolId );
    const chain = chainId ?? fallbackChainId;

    const rewardPair = {
        address: currPool.rewardPair,
        abi: tokenAbi,
    } as const

    const dn404Pair = {
        address: currPool._404Pair,
        abi: tokenAbi,
    } as const

    const usdtPair = {
        address: wethUsdPair[chainId as ChainId ?? fallbackChainId],
        abi: tokenAbi,
    } as const

    const dn404Contract = {
        address: currPool._404Token,
        abi: tokenAbi,
    } as const

    const rewardContract = {
        address: currPool.rewardAddress,
        abi: tokenAbi,
    } as const

    const usdtContract = {
        address: usdContract[chainId as ChainId ?? fallbackChainId],
        abi: tokenAbi,
    } as const

    const wethContract = {
        address: wethContractAddress[chainId as ChainId ?? fallbackChainId],
        abi: tokenAbi,
    } as const


    const { data: priceData, refetch } = useReadContracts({
        allowFailure: false, contracts: [
            {
                ...usdtContract,
                functionName: 'balanceOf',
                args: [usdtPair.address],
            },
            {
                ...wethContract,
                functionName: 'balanceOf',
                args: [usdtPair.address],
            },
            {
                ...rewardContract,
                functionName: 'balanceOf',
                args: [rewardPair.address],
            },
            {
                ...wethContract,
                functionName: 'balanceOf',
                args: [rewardPair.address],
            }], multicallAddress: multicallAddress[chainId as ChainId ?? ChainId.SHIBARIUM]
    });

    const { data: dn404Data, refetch: refetch404 } = useReadContracts({
        allowFailure: false, contracts: [
            {
                ...dn404Contract,
                functionName: 'balanceOf',
                args: [dn404Pair.address],
            },
            {
                ...wethContract,
                functionName: 'balanceOf',
                args: [dn404Pair.address],
            }], multicallAddress: multicallAddress[chainId as ChainId ?? ChainId.SHIBARIUM]
    });

    // console.log(stakingData)

    const refreshPrice = () => {
        refetch();
        refetch404();
    }

    useEffect(() => {
        if (priceData) {
            const usdtPerWeth: number = (Number(formatUnits((priceData as any)?.[0], 6)) / Number(formatUnits((priceData as any)?.[1], 18)));
            const wethPerReward: number = (Number(formatUnits((priceData as any)?.[3], 18)) / Number(formatUnits((priceData as any)?.[2], currPool.rewardDecimals)));
            const usdtPerReward: number = usdtPerWeth * wethPerReward;
            setBonePrice(usdtPerWeth);
            setRewardPrice(usdtPerReward);
            if (dn404Data) {
                const wethPerDn404: number = (Number(formatUnits((dn404Data as any)?.[1], 18)) / Number(formatUnits((dn404Data as any)?.[0], currPool._404TokenDecimals)));
                setDn404Price(usdtPerWeth * wethPerDn404);
            }
        }
    }, [priceData, dn404Data, poolId, currPool]);

    return { bonePrice, rewardPrice, dn404Price, refreshPrice};
}