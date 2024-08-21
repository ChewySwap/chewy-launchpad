import { useEffect, useState } from "react";
import { getPoolSettings } from "../util";
import { ChainId, NftPoolConfig, PoolId } from "../constants";

import { Address, formatEther, formatUnits } from "viem";
import { useReadContracts, useReadContract, useAccount } from "wagmi";
import { stakingAbi, nftAbi, tokenAbi } from "../constants/abi";

export function useIsAdmin(poolId: PoolId, account?: Address) {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const { address, chainId } = useAccount();

    const currPool: NftPoolConfig = getPoolSettings(chainId, poolId ) as NftPoolConfig;

    const stakingContract = {
        address: currPool.address,
        abi: stakingAbi,
    } as const

    const { data } = useReadContract({ address: currPool.address, abi: stakingAbi, functionName: 'owner' });

    useEffect(() => {
        if (data) {
            setIsAdmin(String(data) === address);
        }
    }, [data, poolId, address]);

    return isAdmin;
}