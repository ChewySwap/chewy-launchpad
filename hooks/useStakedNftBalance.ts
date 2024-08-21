// @ts-ignore
import { useEffect, useState } from "react";
import { getPoolSettings } from "../util";
import { ChainId, NftPoolConfig, POOL_CONFIG, PoolId, multicallAddress } from "../constants";
import { Address, formatEther, formatUnits } from "viem";
import { useReadContract, useReadContracts, useAccount } from "wagmi";
// import { useGlobalState } from "~~/services/store/store";
import { stakingAbi, nftAbi, tokenAbi } from "../constants/abi";

/**
 * Custom hook to fetch staked NFT token ID's and pending reward data
 *
 * @param poolId - The ID of the pool.
 * @param balance - The number of staked tokens.
 * @param account - (Optional) The user's account address.
 * @returns An object containing the staked token IDs, pending rewards, and a function to refresh the data.
 */
export function useStakedNftBalance(poolId: PoolId | number, balance: number, account?: Address) {
    const { chainId } = useAccount();
    const currPool: NftPoolConfig = getPoolSettings(chainId ?? 109, poolId);
    const [stakedTokenIds, setMyStakedTokenIds] = useState<Array<any> | null>(null);
    const [pendingRewards, setPendingRewards] = useState<number>(0);
    const [rewardsAmount, setRewardsAmount] = useState<number>(0);

    const stakingContract = {
        address: currPool.address,
        abi: stakingAbi,
    } as const

    let idReads = [];
    let timeReads = [];

    const rewardsAmountRead = [
        {
            ...stakingContract,
            functionName: 'rewardsAmount',
        },
    ] as const

    for (let i = 0; i < balance; i++) {
        idReads.push(
            {
                ...stakingContract,
                functionName: 'stakedTokens',
                args: [account?.toString(), i],
            }
        )
    }

    const { data: rewardsData, isError: rewardsError, isLoading: isRewardsLoading, refetch: refetchData } = useReadContract({
        address: currPool.address,
        abi: stakingAbi,
        functionName: 'rewardsAmount',
        query: {
            enabled: (account && true),
        }
    }) as any;

    const { data: readData, isError, isLoading } = useReadContracts({
        allowFailure: false, contracts: idReads, multicallAddress: multicallAddress[chainId as ChainId ?? ChainId.SHIBARIUM], query: {
            enabled: (account && balance > 0),
        }
    },) as any;

    for (let i = 0; i < balance; i++) {
        // const tokenId: bigint = readData?.[i] as bigint;
        if (readData) {
            timeReads.push(
                {
                    ...stakingContract,
                    functionName: 'tokenStakedTime',
                    args: [account?.toString(), readData[i] as any],
                }
            )
        }
    }

    const { data: timeData, isError: isTimeError, isLoading: isTimeLoading, refetch } = useReadContracts({ allowFailure: false, contracts: timeReads, multicallAddress: multicallAddress[chainId as ChainId ?? ChainId.SHIBARIUM],
        query: {
            enabled: (account && balance > 0),
        }
     }) as any;

    const refreshData = () => {
        refetchData();
        refetch();
    }


    useEffect(() => {
        if (account && rewardsData) {
            setRewardsAmount(Number(rewardsData));
        }
        if (account && readData) {
            let tokenIdArray = [];
            for (let i = 0; i < readData.length; i++) {
                tokenIdArray[i] = Number(readData[i]);
            }
            setMyStakedTokenIds(tokenIdArray);
            // console.log(tokenIdArray);
        }
        if (account && timeData) {
            let tokenRewardsArray = [];
            let totalRewards = 0;
            let timeDuration = 0;
            for (let i = 0; i < timeData.length; i++) {
                timeDuration = Date.now() - (Number(timeData[i]) * 1000);
                if (timeDuration >= 0) {
                    tokenRewardsArray[i] = (Date.now() - (Number(timeData[i]) * 1000)) * rewardsAmount / 86400000;
                    totalRewards += tokenRewardsArray[i];
                } else {
                    tokenRewardsArray[i] = 0;
                }
                tokenRewardsArray[i] = Number(timeData[i]);
            }
            setPendingRewards(Number(totalRewards / (10 ** currPool.rewardDecimals)));
            // console.log(tokenRewardsArray);
        }
        if (balance === 0) {
            setMyStakedTokenIds([]);
            setPendingRewards(0);
        }
    }, [readData, timeData, account, poolId, balance, rewardsAmount, rewardsData, currPool]);

    return { stakedTokenIds, pendingRewards, refreshData };
}