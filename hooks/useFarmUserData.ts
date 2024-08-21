import { FarmConfig } from "@/constants/project-specific/farms/types";
import { useAccount, useReadContracts } from "wagmi";
import { ChainId, ChainIdNum, fallbackChainId } from "../constants";
import { useEffect, useState } from "react";
import { getMasterChefConfigBySlug, getPerBlockCall } from "@/util/contracts/masterchef";
import { FARM_PAGE_CONFIG } from "@/constants/project-specific/farms";
import { formatUnits } from "viem";

// Hook to get public data of a farm
export function useFarmUserData(farmConfig: FarmConfig, chainId: ChainId | ChainIdNum = fallbackChainId) {
    const { address } = useAccount();
    const [totalStaked, setTotalStaked] = useState<BigInt>(BigInt(0));
    const [pendingRewards, setPendingRewards] = useState<BigInt>(BigInt(0));
    const masterchef = getMasterChefConfigBySlug(farmConfig.masterChefSlug ?? FARM_PAGE_CONFIG.fallbackMasterchefSlug, chainId) ?? FARM_PAGE_CONFIG.defaultChef;

    const mcContract = {
        address: masterchef.address,
        abi: masterchef.abi,
    } as const;

    const { data: mcData, refetch } = useReadContracts({
        allowFailure: false, contracts: [
            {
                address: mcContract.address,
                abi: masterchef.abi,
                functionName: 'userInfo',
                args: [farmConfig.pid, address],
                chainId: masterchef.chainId,
            },
            {
                address: mcContract.address,
                abi: masterchef.abi,
                functionName: masterchef.pendingFunction,
                args: [farmConfig.pid, address],
                chainId: masterchef.chainId,
            },
        ]
    });

    useEffect(() => {
        if (!address) return;

        if (mcData) {
            const [stakedTotal, pendingTotal]: [BigInt, BigInt] = mcData[0] as [BigInt, BigInt];
            setTotalStaked(stakedTotal);
            setPendingRewards(mcData[1] as BigInt);
        }
    }, [address, mcData]);

    return { totalStaked: {
        formatted: Number(totalStaked) / (10 ** 18),
        bigInt: totalStaked,
    }, pendingRewards: {
        formatted: Number(pendingRewards) / (10 ** 18),
        bigInt: pendingRewards,
    }, refresh: refetch };
}