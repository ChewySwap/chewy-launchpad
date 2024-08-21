import { Address } from 'viem';
import { ContractConfig } from '@/constants/project-specific/farms/types';
import { tokenAbi } from '@/constants/abi';


export const getTokenContract = (address: Address): ContractConfig => {

    return {
        address: address,
        abi: tokenAbi,
    }
}