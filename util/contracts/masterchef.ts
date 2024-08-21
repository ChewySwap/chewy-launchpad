import { Address, ContractFunctionParameters } from 'viem';
import { ContractConfig, FarmConfig, MasterChefConfig } from '@/constants/project-specific/farms/types';
import { ChainId, ChainIdNum, fallbackChainId } from '@/constants/chain-specific';
import { MASTERCHEFS_CONFIG } from '@/constants/project-specific/farms/masterchef';
import { FARM_PAGE_CONFIG } from '@/constants/project-specific/farms';

const farmSettings = FARM_PAGE_CONFIG

// match masterchef by slug
export function getMasterChefConfigBySlug(slug: string = farmSettings.fallbackMasterchefSlug, chainId: ChainId | ChainIdNum = farmSettings.defaultChain): MasterChefConfig | undefined {
    return MASTERCHEFS_CONFIG[chainId as keyof typeof MASTERCHEFS_CONFIG].find((config) => config.slug === slug);
}

// return wagmi pending rewards call for a given farm
export function getPendingCall(farmConfig: FarmConfig, chainId: ChainId = fallbackChainId, address: Address): ContractFunctionParameters {

    const masterchef = getMasterChefConfigBySlug(farmConfig.masterChefSlug ?? farmSettings.fallbackMasterchefSlug, chainId) ?? farmSettings.defaultChef;

    const mcContract = {
        address: masterchef?.address,
        abi: masterchef?.abi,
    } as const;

    return {
        ...mcContract,
        functionName: masterchef?.pendingFunction,
        args: [farmConfig.pid, address],
    }
}

export function getPerBlockCall(farmConfig: FarmConfig, chainId: ChainId = fallbackChainId): ContractFunctionParameters {

    const masterchef = getMasterChefConfigBySlug(farmConfig.masterChefSlug ?? farmSettings.fallbackMasterchefSlug, chainId) ?? farmSettings.defaultChef;

    const mcContract = {
        address: masterchef?.address,
        abi: masterchef?.abi,
    } as const;

    return {
        ...mcContract,
        functionName: masterchef?.rewardPerBlockFunction,
    }
}
