export interface StakingPoolData {
    wrapAllowance?: number;
    rewardsAmount?: number;
    isApproved?: boolean;
    tokenBalance?: number;
    totalStaked?: number;
    nftBalance?: number;
    myTokenIds?: Array<any> | null;
    stakedTokenIds?: Array<any> | null;
    pendingRewards?: number;
    nftCost?: number;
    totalSupply?: number;
    maxSupply?: number;
    totalStakedNft?: number;
    dn404TotalSupply?: number;
    rewardBalance?: {
        bn?: bigint;
        formatted?: number;
        _404?: {
            bn?: bigint;
            formatted?: number;

        }
    }
    rewardBalanceBn?: bigint;
    dn404RewardBalance?: number;
    dn404RewardBalanceBn?: bigint;
    isOwner?: boolean;
    stakingRewardBalance?: number;
    staking404RewardBalance?: number;
    dn404TokenBalance?: number;

}