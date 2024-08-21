
import React from 'react'
import { Address } from 'viem';

interface HolderListProps {
    chainId: number;
    contract: Address;
    contractType: `staking` | `nft`;
    isAdmin: boolean;
}


function HolderList({ chainId, contract, contractType, isAdmin }: HolderListProps) {
  return (
    <div>

    </div>
  )
}

export default HolderList