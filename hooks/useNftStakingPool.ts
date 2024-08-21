import { useEffect, useState } from "react";
import { getPoolSettings } from "@/util/index";
import { ChainId, DEFAULT_ADMIN_ROLE, NftPoolConfig, POOL_CONFIG, PoolId, multicallAddress } from "@/constants/index";
import { Address, formatEther, formatUnits } from "viem";
import { useReadContracts, useReadContract, useAccount } from "wagmi";

import { stakingAbi, nftAbi, tokenAbi } from "@/constants/abi";
import { useNftBalance } from "./useNftBalance";
import { useStakedNftBalance } from "./useStakedNftBalance";
import { twNftStaking } from '../constants/abi/twNftStaking';
import { GetAccountReturnType, watchAccount } from "@wagmi/core";
import { config as wagmiConfig } from '@/config/index';

/**
 * Custom hook for fetching data related to NFT staking pool.
 * @param poolId - The ID of the staking pool.
 * @param account - Optional account address.
 * @returns An object containing staking data, error status, loading status, refetch function, and query key.
 */
export function useNftStakingPool(poolId: PoolId, account?: Address) {
    const { chainId } = useAccount();
    const currPool: NftPoolConfig = getPoolSettings(chainId ?? 109, poolId);
    const [myTokenIds, setMyTokenIds] = useState<Array<any> | null>(null);
    const [myStakedTokenIds, setMyStakedTokenIds] = useState<Array<any> | null>(null);
    const [myRewards, setMyRewards] = useState<Array<any> | null>(null);
    const [tokenBalance, setTokenBalance] = useState<number>(0);
    const [stakingRewardBalance, setStakingRewardBalance] = useState<number>(0);
    const [staking404RewardBalance, setStaking404RewardBalance] = useState<number>(0);
    const [dn404RewardBalance, setDn404RewardBalance] = useState<number>(0);
    const [dn404RewardBalanceBn, setDn404RewardBalanceBn] = useState<bigint>(BigInt(0));
    const [dn404TokenBalance, setDn404TokenBalance] = useState<number>(0);
    const [rewardBalanceBn, setRewardBalanceBn] = useState<bigint>(BigInt(0));
    const [nftBalance, setNftBalance] = useState<number>(0);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [nftCost, setNftCost] = useState<number>(0);
    const [totalSupply, setTotalSupply] = useState<number>(0);
    const [totalStakedNft, setTotalStakedNft] = useState<number>(0);
    const [maxSupply, setMaxSupply] = useState<number>(0);
    const [rewardsAmount, setRewardsAmount] = useState<number>(0);
    const [totalStaked, setTotalStaked] = useState<number>(0);
    const [dn404TotalSupply, setDn404TotalSupply] = useState<number>(0);
    const [tokenPrice, setTokenPrice] = useState<number>(0);
    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [wrapAllowance, setWrapAllowance] = useState<number>(0);
    const [twTokenIds, setTwTokenIds] = useState<Array<any> | null>(null);
    const [twPendingRewards, setTwPendingRewards] = useState<number>(0);
    const { myTokenIds: tokenIds, refetch: refreshIds } = useNftBalance(poolId, nftBalance, account);
    const { stakedTokenIds, pendingRewards, refreshData } = useStakedNftBalance(poolId, totalStaked, account);
    const [ twAllowance, setTwAllowance ] = useState<number>(0);

    /**
     * Represents the staking contract information.
     */
    const isThirdweb: boolean = currPool.contractType && currPool.contractType === 'thirdweb' ? true : false;

    const stakingContract = {
        address: currPool.address,
        abi: isThirdweb ? twNftStaking : stakingAbi,
    } as const

    /**
     * Represents the NFT contract used in the staking pool.
     */
    const nftContract = {
        address: currPool.nftAddress,
        abi: nftAbi,
    } as const

    /**
     * Represents the token contract used for staking pool rewards.
     */
    const tokenContract = {
        address: currPool.rewardAddress,
        abi: tokenAbi,
    } as const

    /**
     * Represents the DN404 contract.
     */
    const dn404Contract = {
        address: currPool._404Token,
        abi: tokenAbi,
    }

    /**
     * Represents the DN404 reward contract.
     */
    const dn404RewardContract = {
        address: currPool._404RewardAddress,
        abi: tokenAbi,
    }



    /*
    const stakingReads = [
        {
            ...stakingContract,
            functionName: 'rewardsAmount',
        },
        {
            ...nftContract,
            functionName: 'isApprovedForAll',
            args: [account?.toString(), stakingContract.address],
        },
        {
            ...nftContract,
            functionName: 'balanceOf',
            args: [account?.toString()],
        },
        {
            ...stakingContract,
            functionName: 'countofMyStakedTokens',
            args: [account?.toString()],
        },
        {
            ...tokenContract,
            functionName: 'balanceOf',
            args: [account?.toString()],
        },
    ] as const */

    /**
     * Custom hook for fetching data related to NFT staking pool.
     * @returns An object containing staking data, error status, loading status, refetch function, and query key.
     */
    const { data: tokenData, isError: isTokenError, isLoading: isTokenLoading, refetch } = useReadContracts({
        allowFailure: false, contracts: [
            {
                ...nftContract,
                functionName: 'isApprovedForAll',
                args: [account as any, stakingContract.address],
            },
            {
                ...nftContract,
                functionName: 'balanceOf',
                args: [account as any],
            },
            {
                ...tokenContract,
                functionName: 'balanceOf',
                args: [account as any],
            },
            {
                ...tokenContract,
                functionName: 'balanceOf',
                args: [stakingContract.address as any],
            }], multicallAddress: multicallAddress[chainId as ChainId ?? ChainId.SHIBARIUM]
    });

    const { data: stakeData, isError: isStakingError, isLoading: isStakeLoading, refetch: refetchStake } = useReadContracts({
        allowFailure: false, contracts: [
            {
                ...stakingContract,
                functionName: 'countofMyStakedTokens',
                args: [account as any],
            },
            {
                ...stakingContract,
                functionName: 'owner',
            },
            {
                ...stakingContract,
                functionName: 'rewardsAmount',
            },
        ], multicallAddress: multicallAddress[chainId as ChainId ?? ChainId.SHIBARIUM],
        query: {
            enabled: !isThirdweb
        }
    });

    const { data: twStakeData, isError: isTwStakingError, isLoading: isTwStakeLoading, refetch: refetchTw } = useReadContracts({
        allowFailure: false, contracts: [
            {
                ...stakingContract,
                functionName: 'getStakeInfo',
                args: [account as any],
            },
            {
                ...stakingContract,
                functionName: 'hasRole',
                args: [DEFAULT_ADMIN_ROLE, account as any],
            },
            {
                ...stakingContract,
                functionName: 'getRewardsPerUnitTime',
            },
            {
                ...stakingContract,
                functionName: 'getRewardTokenBalance',
            },
            {
                ...tokenContract,
                functionName: 'allowance',
                args: [account as any, stakingContract.address as any],
            },
            {
                ...nftContract,
                functionName: 'balanceOf',
                args: [stakingContract.address]
            },
        ], multicallAddress: multicallAddress[chainId as ChainId ?? ChainId.SHIBARIUM],
        query: {
            enabled: isThirdweb
        }
    });


    /**
     * Hook to fetch data related to NFT staking pool.
     * @returns An object containing the NFT supply data and a function to refetch the supply.
     */
    const { data: nftSupply, refetch: refetchSupply } = useReadContracts({
        allowFailure: false, contracts: [
            {
                ...nftContract,
                functionName: 'cost',
            },
            {
                ...nftContract,
                functionName: 'totalSupply'
            },
            {
                ...nftContract,
                functionName: 'maxSupply'
            },
        ], multicallAddress: multicallAddress[chainId as ChainId ?? ChainId.SHIBARIUM]
    });

    /**
     * Custom hook for reading contract data related to NFT staking pool.
     * @returns An object containing the contract data and a function to refetch the data.
     */
    const { data: dn404Data, refetch: refetch404 } = useReadContracts({
        allowFailure: false, contracts: [
            {
                ...dn404Contract,
                functionName: 'totalSupply',
            },
            {
                ...dn404RewardContract,
                functionName: 'balanceOf',
                args: [account as any],
            },
            {
                ...dn404RewardContract,
                functionName: 'balanceOf',
                args: [stakingContract.address as any],
            },
            {
                ...dn404Contract,
                functionName: 'balanceOf',
                args: [account as any],
            },
            {
                ...tokenContract,
                functionName: 'allowance',
                args: [account as any, dn404RewardContract.address as any],
            },], multicallAddress: multicallAddress[chainId as ChainId ?? ChainId.SHIBARIUM]
    });

    // const { data: dn404Supply } = useReadContract({ address: currPool._404Token, abi: tokenAbi, functionName: 'totalSupply' } as any);

    const { data: nftData, isError: isNftError, isLoading: isNftLoading, refetch: refetchNft } = useReadContracts({
        allowFailure: false, contracts: [
            {
                ...nftContract,
                functionName: 'balanceOf',
                args: [stakingContract.address]
            },
            {
                ...stakingContract,
                functionName: 'rewardsAmount',
            },
        ], multicallAddress: multicallAddress[chainId as ChainId ?? ChainId.SHIBARIUM]
    });

    // console.log(tokenData)

    /**
     * Refreshes the data by triggering multiple refetch functions.
     * This function is responsible for updating the data used in the component.
     */
    const refresh = () => {
        refetch();
        refetchNft();
        refreshData();
        refreshIds();
        refetch404();
        refetchTw();
        refetchSupply();
    }

    useEffect(() => {
        if (account && tokenData) {
            setIsApproved((tokenData as any)?.[0]);
            setNftBalance(Number((tokenData as any)?.[1]));
            setTokenBalance(Number(formatUnits((tokenData as any)?.[2], currPool.rewardDecimals)));
            setRewardBalanceBn((tokenData as any)?.[2]);

            if (!isThirdweb) {
                setStakingRewardBalance(Number(formatUnits((tokenData as any)?.[3], currPool.rewardDecimals)));
            }
        }
        if (nftSupply) {
            setMaxSupply(currPool.nftMaxSupply);
            setNftCost(Number(formatUnits((nftSupply as any)?.[0], 18)));
            setTotalSupply(Number((nftSupply as any)?.[1]));
        }
        if (nftData) {
            // setNftCost(Number(formatUnits((nftData as any)?.[0], 18)));
            // setTotalSupply(Number((nftData as any)?.[1]));
            // setMaxSupply(Number((nftData as any)?.[2]));
            setTotalStakedNft(Number((nftData as any)?.[0]));
            setMaxSupply(currPool.nftMaxSupply);
        }
        if (dn404Data) {
            setDn404TotalSupply(Number(formatUnits((dn404Data as any)?.[0], currPool._404TokenDecimals)));
            setDn404RewardBalance(Number(formatUnits((dn404Data as any)?.[1], currPool.rewardDecimals)));
            setDn404RewardBalanceBn((dn404Data as any)?.[1]);
            setStaking404RewardBalance(Number(formatUnits((dn404Data as any)?.[2], currPool.rewardDecimals)));
            setDn404TokenBalance(Number(formatUnits((dn404Data as any)?.[3], currPool._404TokenDecimals)));
            if (currPool.is404) {
                setWrapAllowance(Number(formatUnits((dn404Data as any)?.[4], currPool.rewardDecimals)));
            }

        }
        if (account && tokenIds) {
            setMyTokenIds(tokenIds);
        }
        if (account && stakedTokenIds) {
            setMyStakedTokenIds(stakedTokenIds);
        }
        if (!account) {
            setMyTokenIds([]);
            setMyStakedTokenIds([]);
        }
    }, [tokenData, account, poolId, tokenIds, stakedTokenIds, nftData, dn404Data, nftSupply, currPool, isThirdweb]);

    useEffect(() => {
        if (!isThirdweb && stakeData) {
            setTotalStaked(Number((stakeData as any)?.[0]));
            setIsOwner(String((stakeData as any)?.[1]) === account);
            setRewardsAmount(Number(formatUnits((stakeData as any)?.[2], currPool.rewardDecimals)));
        }

    }, [account, poolId, stakeData, isThirdweb, currPool.rewardDecimals]);

    useEffect(() => {
        if (isThirdweb && twStakeData) {
            const twTotalStaked = twStakeData[0][0].length;
            const twStakedIds = twStakeData[0][0];
            setTotalStaked(twTotalStaked);
            setIsOwner(twStakeData[1]);
            setRewardsAmount(Number(formatUnits(twStakeData[2], currPool.rewardDecimals)));
            setTwPendingRewards(Number(formatUnits(twStakeData[0][1], currPool.rewardDecimals)));
            setStakingRewardBalance(Number(formatUnits(twStakeData[3], currPool.rewardDecimals)));
            setTwAllowance(Number(formatUnits(twStakeData[4], currPool.rewardDecimals)));
            setTotalStakedNft(Number((twStakeData as any)?.[5]));
            if (twTotalStaked > 0) {
                let stakedIdsArray = [];
                for (let i = 0; i < twTotalStaked; i++) {
                    stakedIdsArray[i] = Number(twStakedIds[i]);
                }
                setTwTokenIds(stakedIdsArray);
            }
        }

    }, [account, currPool.rewardDecimals, isThirdweb, twStakeData]);

    return {
        wrapAllowance, rewardsAmount, isApproved, tokenBalance, totalStaked, nftBalance, myTokenIds, stakedTokenIds: (isThirdweb ? twTokenIds : stakedTokenIds), pendingRewards: (isThirdweb ? twPendingRewards : pendingRewards), refresh, nftCost, totalSupply, twAllowance, maxSupply, totalStakedNft, dn404TotalSupply, rewardBalanceBn, dn404RewardBalance, dn404RewardBalanceBn, isOwner, stakingRewardBalance, staking404RewardBalance, dn404TokenBalance,
        allPoolData: {
            wrapAllowance, rewardsAmount, isApproved, tokenBalance, totalStaked, nftBalance, myTokenIds, stakedTokenIds: (isThirdweb ? twTokenIds : stakedTokenIds), pendingRewards: (isThirdweb ? twPendingRewards : pendingRewards), refresh, nftCost, twAllowance, totalSupply, maxSupply, totalStakedNft, dn404TotalSupply, rewardBalanceBn, dn404RewardBalance, dn404RewardBalanceBn, isOwner, stakingRewardBalance, staking404RewardBalance, dn404TokenBalance
        }
    };
}