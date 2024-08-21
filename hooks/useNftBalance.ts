// @ts-ignore
import { useEffect, useState } from "react";
import { getPoolSettings } from "../util";
import { ChainId, NftPoolConfig, POOL_CONFIG, PoolId, multicallAddress, BlockchainNftPoolConfig } from "../constants";
import { Address } from "viem";
import { useReadContracts, useAccount } from "wagmi";
import { nftAbi } from "../constants/abi";




/**
 * Custom hook to fetch the user's NFT balance in an array of tokenId's for a specific pool.
 * @param poolId - The ID of the pool.
 * @param balance - User's total NFT balanceOf.
 * @param account - (Optional) The account address.
 * @returns An object containing the NFT token IDs and a refetch function.
 */
export function useNftBalance(poolId: PoolId | number, balance: number, account?: Address) {
    const { chainId } = useAccount();
    const currPool: NftPoolConfig = getPoolSettings(chainId ?? ChainId.SHIBARIUM, poolId ?? 1 );
    const [myTokenIds, setMyTokenIds] = useState<Array<number> | null>(null);

    const nftContract = {
        address: currPool.nftAddress,
        abi: nftAbi,
    } as const

    let idReads: Array<any> = [];

    for ( let i = 0; i < balance; i++ ) {
        idReads.push(
            {
                ...nftContract,
                functionName: 'tokenOfOwnerByIndex',
                args: [account?.toString(), i],
            }
        )
    }

    const { data: readData, isError, isLoading, refetch } = useReadContracts({ allowFailure: false, contracts: idReads, multicallAddress: multicallAddress[chainId as ChainId ?? ChainId.SHIBARIUM] });

    const refresh = () => {
        refetch();
    }

    useEffect(() => {
        if (readData) {
            let tokenIdArray: Array<number> = [];
            for (let i = 0; i < readData.length; i++) {
                tokenIdArray[i] = Number(readData[i]);
            }
            setMyTokenIds(tokenIdArray);
            // console.log(tokenIdArray);
        }
        if (balance === 0) {
            setMyTokenIds([]);
        }
    }, [readData, balance]);

    return { myTokenIds, refetch };
}