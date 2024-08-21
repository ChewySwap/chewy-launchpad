"use client";
import { useCallback, useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  Image,
  Button,
  Slider,
  CardHeader,
  AvatarGroup,
  Avatar,
} from "@nextui-org/react";
import { useNftStakingPool } from "@/hooks/useNftStakingPool";
import {
  getPoolSettings,
  getPoolName,
  getPoolNamesByChainId,
  chunkArray,
  getPoolIdByNftPoolConfig,
  IfNull,
  removeItemAll,
  slugifyString,
} from "@/util/index";
import { NftPoolConfigType } from "@/constants/types";
import { ChainId, fallbackChainId } from "@/constants/chain-specific";
import { Abi, Address } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { barImgUrl } from "@/components/BarImage";
import { useTokenPrice } from "@/hooks/useTokenPrice";
import RainbowButton from "@/components/Buttons/RainbowButton";
import { toast } from "react-toastify";
import ConfirmedTx from "@/components/ConfirmedTx";
import { GetAccountReturnType, watchAccount } from "@wagmi/core";
import { twNftStaking, stakingAbi } from "@/constants/abi";
import { batchSettings } from "@/constants/project-specific";
import { useAtom } from "jotai";
import { userBatchSettings } from "@/config/atoms";
import { config as wagmiConfig } from "@/config/index";
import { usePathname, useRouter } from "next/navigation";

interface PoolListItemProps {
  NftPoolConfig: NftPoolConfigType | undefined;
  poolId: number;
  chainIdNum?: ChainId;
  account?: Address;
}

export default function PoolListItem({
  NftPoolConfig,
  poolId,
  chainIdNum = fallbackChainId,
  account,
}: PoolListItemProps) {
  const {
    address,
    chainId,
    connector: activeConnector,
    isConnecting,
    isDisconnected,
    isConnected,
  } = useAccount();

  const {
    allPoolData: poolData,
    myTokenIds,
    refresh,
  } = useNftStakingPool(poolId ?? 1, address);

  const { writeContract, data: writeData, isPending } = useWriteContract();

  const {
    data: writeResult,
    isError: writeError,
    isFetched,
    isLoading: txLoading,
  } = useWaitForTransactionReceipt({
    hash: writeData,
  });

  const { bonePrice, rewardPrice, dn404Price, refreshPrice } =
    useTokenPrice(poolId);

  const router = useRouter();

  const [batchMaxSettings, setBatchMaxSettings] = useAtom(userBatchSettings);

  const currPool = getPoolSettings(chainIdNum, poolId);
  console.log(poolData);

  const perDay =
    poolData.totalStaked > 0
      ? poolData.rewardsAmount * poolData.totalStaked
      : poolData.rewardsAmount;
  const perDayUSD = perDay * rewardPrice;

  const isThirdweb: boolean =
    currPool?.contractType === "thirdweb" ? true : false;


  const getRandomNftId = () => {
    return Math.floor(Math.random() * (currPool.nftMaxSupply - 1 + 1) + 1);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const randomNftId = useMemo(() => getRandomNftId(), []);

  const claim = useCallback(() => {
    console.log("Claiming Rewards...");
    if (!isConnected) {
      toast("Must Connect Wallet to Claim!", { type: "error" });
      return;
    }

    if (isThirdweb) {
      writeContract({
        abi: twNftStaking as Abi,
        address: currPool?.address as Address,
        functionName: "claimRewards",
      });
      return;
    }

    if (!poolData.stakedTokenIds || poolData.stakedTokenIds.length === 0) {
      toast("No NFTs Staked to Claim!", { type: "error" });
      return;
    }

    const stakeTokenIds = poolData.stakedTokenIds.map((id) => BigInt(id));
    const txWrites = [];
    let maxBatchClaimAttempt: number =
      Number(batchMaxSettings.maxBatchClaim) ??
      batchSettings.maxBatchClaim ??
      30;
    const stakedTokenIdChunks = chunkArray(stakeTokenIds, maxBatchClaimAttempt);
    if (stakedTokenIdChunks.length > 1) {
      for (const chunk of stakedTokenIdChunks) {
        console.log(chunk);
        writeContract({
          abi: stakingAbi as Abi,
          address: currPool?.address as Address,
          functionName: "batchClaimRewards",
          args: [chunk],
        });
      }
    } else {
      writeContract({
        abi: stakingAbi as Abi,
        address: currPool?.address as Address,
        functionName: "batchClaimRewards",
        args: [stakeTokenIds],
      });
    }
  }, [
    batchMaxSettings.maxBatchClaim,
    currPool?.address,
    isConnected,
    poolData.stakedTokenIds,
    isThirdweb,
    writeContract,
  ]);

  useEffect(() => {
    if (activeConnector) {
      const unwatch = watchAccount(wagmiConfig, {
        onChange(
          account: GetAccountReturnType,
          prevAccount: GetAccountReturnType
        ) {
          refresh();
          refreshPrice();
        },
      });
      unwatch();
    }
  }, [activeConnector, refresh]);

  useEffect(() => {
    if (isFetched) {
      // setTxHashArray(String(writeResult?.transactionHash));
      toast(
        <ConfirmedTx
          hash={writeResult?.transactionHash}
          message={`Successfully Claimed ${poolData.pendingRewards.toLocaleString()} ${
            currPool.rewardSymbol
          } Rewards!`}
        />,
        {
          type: "success",
        }
      );
      refresh();
      refreshPrice();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched]);

  return (
    <Card className="mb-2 w-full cards-nftpoolpreview">
      <CardHeader className="">
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="text-lg md:text-xl truncate">
              {NftPoolConfig?.name}
            </div>
            <div className="text-xs md:text-sm text-green-500">
              {perDay.toLocaleString()} {currPool.rewardSymbol} ($
              {perDayUSD.toLocaleString()}) Per Day
            </div>
          </div>
          <div className="inline-flex">
            <div>
              <img
                src={`${currPool.nftUri}${randomNftId}${currPool.nftExt}`}
                alt={currPool.nftName}
                width="30px"
                height="30px"
                className="rounded-md"
              />
            </div>
            <div className="px-2">/</div>
            <div>
              <img
                src={`${currPool.rewardLogo}`}
                alt={currPool.rewardName}
                width="30px"
                height="30px"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <span className="text-sm md:text-md">
          {NftPoolConfig?.aboutContent2}
        </span>

        <div className="flex flex-row flex-wrap justify-between py-2">
          <div className="flex-column">
            <div className="pt-2 pb-2">
              {poolData.nftBalance > 0 ? "In Wallet:" : "None in Wallet"}
            </div>
            <div className="">
              <AvatarGroup radius="md" max={7} total={poolData.nftBalance}>
                {poolData.nftBalance > 0 && myTokenIds?.map((tokenId) => (
                  <Avatar
                    key={tokenId}
                    src={`${currPool.nftUri}/${tokenId}${currPool.nftExt}`}
                  />
                ))}
              </AvatarGroup>
            </div>
          </div>

          <div className="flex-column flex-wrap content-end justify-end place-content-end">
            <div className="w-full pt-1">
              {poolData.totalStaked > 0 ? "Staked:" : "None Staked"}
            </div>
            <div className="pt-1">
              <AvatarGroup radius="md" max={7} total={poolData.totalStaked}>
                {poolData.totalStaked > 0 && poolData.stakedTokenIds?.map((tokenId) => (
                  <Avatar
                    key={tokenId}
                    src={`${currPool.nftUri}/${tokenId}${currPool.nftExt}`}
                  />
                ))}
              </AvatarGroup>
            </div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-evenly gap-2 pt-3">
          <Button
            className="w-full md:w-35"
            onClick={() =>
              router.push(`/nft-staking/${slugifyString(currPool.name)}`)
            }
          >
            Open Pool
          </Button>
          {isConnected && poolData.pendingRewards > 0 && (
            <RainbowButton
              className="w-full md:w-35"
              onClick={() => claim()}
              disabled={isPending}
            >
              {isPending
                ? "Confirm in Wallet..."
                : txLoading
                ? "Please Wait..."
                : `Claim ${poolData.pendingRewards.toLocaleString()} ${
                    currPool.rewardSymbol
                  }`}
            </RainbowButton>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
