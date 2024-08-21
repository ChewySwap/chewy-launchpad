"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { useCallback, useEffect, useState } from "react";
import "viem/window";
import { useAtom } from "jotai";
import {
  getPoolSettings,
  getPoolName,
  getPoolNamesByChainId,
  chunkArray,
  getPoolIdByNftPoolConfig,
  IfNull,
  cn,
} from "@/util/index";

import {
  ChainId,
  PoolId,
  fallbackChainId,
  wethUsdPair,
  farButton1,
  farButton2,
  farImage,
  NftPoolConfigType,
} from "@/constants/index";
import {
  Address,
  parseEther,
  formatUnits,
  parseUnits,
  Abi,
  erc20Abi,
} from "viem";
import { GetAccountReturnType, watchAccount } from "@wagmi/core";
import "viem/window";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  useBalance,
} from "wagmi";
import { Bolt, Info, Landmark, Settings2, UserRoundCog } from "lucide-react";
import { ButtonOverride as Button } from "@/components/Buttons/ButtonOverride";
import {
  Divider,
  Modal,
  ModalBody,
  ScrollShadow,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
  ButtonGroup,
  Input,
  Accordion,
  AccordionItem,
  Skeleton,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import CountUp from "react-countup";
import { batchSettings, chewyLink } from "@/constants/index";
import { useNftStakingPool } from "@/hooks/useNftStakingPool";

import {
  stakingAbi,
  nftAbi,
  wrappedTokenAbi,
  wrappedETHAbi,
  tokenAbi,
  twNftStaking,
} from "@/constants/abi";
import { useTokenPrice } from "@/hooks/useTokenPrice";

import WalletIcon from "@/components/WalletIcon";
import SettingsButton from "@/widgets/SettingsButton";
import { userBatchSettings, sortNftAtom } from "@/config/atoms/index";
import DeployButton from "@/widgets/DeployButton";
import { removeItemAll, sortNumbersAsc, sortNumbersDesc } from "@/util/arrays";
import ConfirmedTx from "@/components/ConfirmedTx";
import { customFont } from "@/constants/index";
import { watchNft, watchReward } from "@/lib/watchAsset";
import InfoCard from "@/components/Staking/InfoCard";
import { RainbowButton } from "@/components/RainbowButton";
import { NftCarousel } from "app/blocks/NftCarousel";
import BarImage, { barImgUrl } from "@/components/BarImage";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import SortDropDown from "@/components/Buttons/SortDropDown";
import { config as wagmiConfig } from "@/config/index";
import RowBetween from "@/components/Layout/Flex/RowBetween";
import { nftSort } from "@/util/nft/sort";
import CandleChart from "@/components/Charts/Candlestick";
import StakingChart from "@/components/Charts/StakingChart";

interface StakingPoolProps {
  NftPoolConfig: NftPoolConfigType | undefined;
  chartData: any[] | null | undefined;
}

export default function StakingPool({
  NftPoolConfig,
  chartData,
}: StakingPoolProps) {
  const currPool: NftPoolConfigType =
    NftPoolConfig ?? getPoolSettings(fallbackChainId);
  const isThirdweb =
    currPool.contractType && currPool.contractType === "thirdweb"
      ? true
      : false;
  const poolId: number = typeof currPool?.pid === "number" ? currPool?.pid : 1;
  const [batchMaxSettings, setBatchMaxSettings] = useAtom(userBatchSettings);

  const { open: openConnectModal } = useWeb3Modal();

  const {
    isOpen: isStakeOpen,
    onOpen: onStakeOpen,
    onOpenChange: onStakeOpenChange,
  } = useDisclosure();
  const {
    isOpen: isUnstakeOpen,
    onOpen: onUnstakeOpen,
    onOpenChange: onUnstakeOpenChange,
  } = useDisclosure();
  const {
    isOpen: isMintOpen,
    onOpen: onMintOpen,
    onOpenChange: onMintOpenChange,
  } = useDisclosure();
  const {
    isOpen: isAdminOpen,
    onOpen: onAdminOpen,
    onOpenChange: onAdminOpenChange,
  } = useDisclosure();

  const [mintAmount, setMintAmount] = useState<number>(1);
  const {
    address,
    chainId,
    connector: activeConnector,
    isConnecting,
    isDisconnected,
    isConnected,
  } = useAccount();
  const {
    rewardsAmount,
    isApproved,
    tokenBalance,
    totalStaked,
    isOwner,
    nftBalance,
    myTokenIds,
    stakedTokenIds,
    pendingRewards,
    refresh,
    rewardBalanceBn,
    dn404RewardBalance,
    dn404RewardBalanceBn,
    stakingRewardBalance,
    staking404RewardBalance,
    nftCost,
    maxSupply,
    totalSupply,
    totalStakedNft,
    dn404TotalSupply,
    dn404TokenBalance,
    wrapAllowance,
    twAllowance,
  } = useNftStakingPool(poolId, address);
  const [selectedStake, setSelectedStake] = useState<number[]>([]);
  const [selectedUnstake, setSelectedUnstake] = useState<number[]>([]);
  const { bonePrice, rewardPrice, dn404Price, refreshPrice } =
    useTokenPrice(poolId);
  const accountBalance = useBalance({ address: address });
  const [adminRewardsAmount, setAdminRewardsAmount] = useState<string>("");
  const [adminSendAmount, setAdminSendAmount] = useState<string>("");
  const [wrapAmount, setWrapAmount] = useState<string>("");
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
  const [txHashArray, setTxHashArray] = useState<`0x${string}`[]>([]);
  const [wrapOpenedOnce, setWrapOpenedOnce] = useState<boolean>(false);
  const [sortNftSetting] = useAtom(sortNftAtom);

  const {
    writeContract,
    data: writeHash,
    isSuccess: isWriteSuccess,
    isPending: txPending,
    isError,
  } = useWriteContract();

  const {
    data: writeResult,
    isError: writeError,
    isFetched,
    isLoading: writeLoading,
  } = useWaitForTransactionReceipt({
    hash: writeHash,
  });

  function approveAll() {
    writeContract({
      abi: nftAbi,
      address: currPool?.nftAddress,
      functionName: "setApprovalForAll",
      args: [currPool?.address, true],
    });
  }

  const claim = useCallback(() => {
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

    if (!stakedTokenIds || stakedTokenIds.length === 0) {
      toast("No NFTs Staked to Claim!", { type: "error" });
      return;
    }

    const stakeTokenIds = stakedTokenIds.map((id) => BigInt(id));
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
    stakedTokenIds,
  ]);

  function wrap(amount: string) {
    const tokenAddress = currPool?.is404
      ? currPool?._404RewardAddress
      : currPool?.rewardAddress;
    if (amount) {
      if (
        (currPool?.is404 ||
          tokenAddress !==
            wethUsdPair[(chainId as ChainId) ?? fallbackChainId].toString()) &&
        Number(amount) > wrapAllowance
      ) {
        writeContract({
          abi: wrappedTokenAbi,
          address: currPool.rewardAddress,
          functionName: "approve",
          args: [tokenAddress, parseUnits(amount, currPool.rewardDecimals)],
        });
      } else {
        console.info(
          "wrap ",
          amount,
          "tokens \n",
          "tokenAddress: ",
          tokenAddress.toString()
        );
        if (currPool.is404) {
          writeContract({
            abi: wrappedTokenAbi,
            address: tokenAddress,
            functionName: "deposit",
            args: [parseUnits(amount, currPool.rewardDecimals)],
          });
        } else {
          if (
            tokenAddress.toString() ===
            wethUsdPair[(chainId as ChainId) ?? fallbackChainId].toString()
          ) {
            writeContract({
              abi: wrappedETHAbi,
              address: tokenAddress,
              functionName: "deposit",
              value: parseEther(amount),
            });
          } else {
            writeContract({
              abi: wrappedTokenAbi,
              address: tokenAddress,
              functionName: "deposit",
              args: [parseUnits(amount, currPool.rewardDecimals)],
            });
          }
        }
      }
    } else {
      toast("Error", { type: "error" });
    }
  }

  function unwrap() {
    const tokenAddress = currPool.is404
      ? (currPool._404RewardAddress as Address)
      : (currPool.rewardAddress as Address);
    const balance = currPool.is404 ? dn404RewardBalanceBn : rewardBalanceBn;
    if (!isConnected) {
      toast("Must Connect Wallet to Unwrap!", { type: "error" });
    } else {
      if (dn404RewardBalanceBn && Number(dn404RewardBalanceBn) > 0) {
        writeContract({
          abi: wrappedTokenAbi,
          address: tokenAddress,
          functionName: "withdraw",
          args: [balance],
        });
      } else {
        toast("No Rewards to Unwrap", { type: "error" });
      }
    }
  }

  function setRewardsAmount(amount: string) {
    if (amount) {
      if (isThirdweb) {
        writeContract({
          abi: twNftStaking,
          address: currPool?.address,
          functionName: "setRewardsPerUnitTime",
          args: [parseUnits(amount, currPool.rewardDecimals)],
        });
      } else {
        writeContract({
          abi: stakingAbi,
          address: currPool.address,
          functionName: "setRewardsAmount",
          args: [parseUnits(amount, currPool.rewardDecimals)],
        });
      }
    } else {
      toast("Error", { type: "error" });
    }
  }

  function fillStakingRewards(amount: string) {
    if (isThirdweb) {
      if (twAllowance < Number(amount)) {
        writeContract({
          abi: erc20Abi as Abi,
          address: currPool?.rewardAddress as Address,
          functionName: "approve",
          args: [currPool.address, parseUnits(amount, currPool.rewardDecimals)],
        });
      } else {
        writeContract({
          abi: twNftStaking as Abi,
          address: currPool?.address as Address,
          functionName: "depositRewardTokens",
          args: [parseUnits(amount, currPool.rewardDecimals)],
        });
      }
    } else {
      const tokenAddress = currPool.is404
        ? (currPool._404RewardAddress as Address)
        : (currPool.rewardAddress as Address);
      if (amount) {
        writeContract({
          abi: tokenAbi,
          address: tokenAddress,
          functionName: "transfer",
          args: [currPool.address, parseUnits(amount, currPool.rewardDecimals)],
        });
      } else {
        toast("Error", { type: "error" });
      }
    }
  }

  async function batchStake() {
    if (!isConnected) {
      toast("Must Connect Wallet to Claim!", { type: "error" });
      return;
    }

    if (!myTokenIds || myTokenIds.length === 0) {
      toast("No NFTs to Stake!", { type: "error" });
      return;
    }

    if (isThirdweb) {
      const stakeTokenIds = myTokenIds.map((id) => BigInt(id));

      writeContract({
        abi: twNftStaking as Abi,
        address: currPool?.address as Address,
        functionName: "stake",
        args: [stakeTokenIds],
      });
      return;
    }

    const stakeTokenIds = myTokenIds.map((id) => BigInt(id));
    const txWrites = [];
    let maxBatchClaimAttempt: number =
      Number(batchMaxSettings.maxBatchStake) ??
      batchSettings.maxBatchStake ??
      100;
    const stakedTokenIdChunks = chunkArray(stakeTokenIds, maxBatchClaimAttempt);
    if (stakedTokenIdChunks.length > 1) {
      for (const chunk of stakedTokenIdChunks) {
        console.log(chunk);
        writeContract({
          abi: stakingAbi as Abi,
          address: currPool.address as Address,
          functionName: "batchStakeNFT",
          args: [chunk],
        });
      }
    } else {
      writeContract({
        abi: stakingAbi as Abi,
        address: currPool.address as Address,
        functionName: "batchStakeNFT",
        args: [stakeTokenIds],
      });
    }
  }

  async function batchUnstake() {
    if (!isConnected) {
      toast("Must Connect Wallet to Claim!", { type: "error" });
      return;
    }

    if (!stakedTokenIds || stakedTokenIds.length === 0) {
      toast("No NFTs Staked to Claim!", { type: "error" });
      return;
    }

    if (isThirdweb) {
      const stakeTokenIds = stakedTokenIds.map((id) => BigInt(id));

      writeContract({
        abi: twNftStaking as Abi,
        address: currPool?.address as Address,
        functionName: "withdraw",
        args: [stakeTokenIds],
      });
      return;
    }

    const stakeTokenIds = stakedTokenIds.map((id) => BigInt(id));
    const txWrites = [];
    let maxBatchClaimAttempt: number =
      Number(batchMaxSettings.maxBatchUnstake) ??
      batchSettings.maxBatchUnstake ??
      40;
    const stakedTokenIdChunks = chunkArray(stakeTokenIds, maxBatchClaimAttempt);
    if (stakedTokenIdChunks.length > 1) {
      for (const chunk of stakedTokenIdChunks) {
        console.log(chunk);
        writeContract({
          abi: stakingAbi as Abi,
          address: currPool.address as Address,
          functionName: "batchUnstakeNFT",
          args: [chunk],
        });
      }
    } else {
      writeContract({
        abi: stakingAbi as Abi,
        address: currPool.address as Address,
        functionName: "batchUnstakeNFT",
        args: [stakeTokenIds],
      });
    }
  }

  function mint(amount: number) {
    if (
      accountBalance.data &&
      nftCost * amount * 10 ** 18 > accountBalance.data.value.valueOf()
    ) {
      toast("Insufficient Balance to Mint!", { type: "error" });
      return;
    }
    writeContract({
      abi: nftAbi,
      address: currPool.nftAddress,
      functionName: "mint",
      args: [BigInt(amount)],
      value: parseEther(String(nftCost * amount)),
    });
  }

  function stake() {
    if (isApproved === true) {
      if (selectedStake.length < 2) {
        if (isThirdweb) {
          writeContract({
            abi: twNftStaking,
            address: currPool.address as Address,
            functionName: "stake",
            args: [[BigInt(selectedStake[0])]],
          });
        } else {
          writeContract({
            abi: stakingAbi,
            address: currPool.address as Address,
            functionName: "stakeNFT",
            args: [BigInt(selectedStake[0])],
          });
        }
      } else {
        let stakeTokenIds = [];
        for (let i = 0; i < selectedStake.length; i++) {
          stakeTokenIds[i] = BigInt(selectedStake[i]);
        }
        if (isThirdweb) {
          writeContract({
            abi: twNftStaking as Abi,
            address: currPool?.address as Address,
            functionName: "stake",
            args: [stakeTokenIds],
          });
        } else {
          writeContract({
            abi: stakingAbi,
            address: currPool.address,
            functionName: "batchStakeNFT",
            args: [stakeTokenIds],
          });
        }
      }
    } else {
      approveAll();
    }
  }

  function unstake() {
    if (selectedUnstake.length < 2) {
      if (isThirdweb) {
        writeContract({
          abi: twNftStaking as Abi,
          address: currPool?.address as Address,
          functionName: "withdraw",
          args: [[BigInt(selectedUnstake[0])]],
        });
      } else {
        writeContract({
          abi: stakingAbi,
          address: currPool.address,
          functionName: "unstakeNFT",
          args: [BigInt(selectedUnstake[0])],
        });
      }
    } else {
      let unstakeTokenIds = [];
      for (let i = 0; i < selectedUnstake.length; i++) {
        unstakeTokenIds[i] = BigInt(selectedUnstake[i]);
      }
      if (isThirdweb) {
        writeContract({
          abi: twNftStaking as Abi,
          address: currPool?.address as Address,
          functionName: "withdraw",
          args: [unstakeTokenIds],
        });
      } else {
        writeContract({
          abi: stakingAbi,
          address: currPool.address,
          functionName: "batchUnstakeNFT",
          args: [unstakeTokenIds],
        });
      }
    }
  }

  const handleStakeClick = async (source: number) => {
    const check = selectedStake.includes(source);
    if (check) {
      const id = selectedStake.indexOf(source);
      let newArr = selectedStake;
      newArr.splice(id, 1);
      setSelectedStake([...newArr]);
    } else {
      selectedStake.push(source);
      setSelectedStake([...selectedStake]);
    }
  };

  const handleUnstakeClick = async (source: number) => {
    const check = selectedUnstake.includes(source);
    if (check) {
      const id = selectedUnstake.indexOf(source);
      let newArr = selectedUnstake;
      newArr.splice(id, 1);
      setSelectedUnstake([...newArr]);
    } else {
      selectedUnstake.push(source);
      setSelectedUnstake([...selectedUnstake]);
    }
  };

  const poolNames = getPoolNamesByChainId(chainId ?? ChainId.SHIBARIUM);
  /*
  useEffect(() => {
    if (activeConnector) {
      const unwatch = watchAccount(wagmiConfig, {
        onChange(
          account: GetAccountReturnType,
          prevAccount: GetAccountReturnType
        ) {
          console.log("NOTICE: Account changed from: ", account);
          console.log(" to: ", prevAccount);
          refresh();
        },
      });
      unwatch();
    }
  }, [activeConnector, refresh]);

  */

  useEffect(() => {
    if (isFetched) {
      // setTxHashArray(String(writeResult?.transactionHash));
      toast(
        <ConfirmedTx
          hash={writeResult?.transactionHash}
          message="Transaction Confirmed!"
        />,
        {
          type: "success",
        }
      );
      setTxHashArray(
        removeItemAll([...txHashArray], writeResult?.transactionHash)
      );
      refresh();
      refreshPrice();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortNftSetting]);

  useEffect(() => {
    if (writeHash) {
      if (!txHashArray.includes(writeHash) && writeHash !== undefined) {
        setTxHashArray([...txHashArray, writeHash]);
        console.log(txHashArray);
      }
      console.log(txHashArray);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writeHash]);

  useEffect(() => {
    if (txHashArray) {
      console.log(txHashArray);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHashArray]);

  return (
    <>
      <aside aria-label="Staking Stats">
        <div className="markbarmain pt-0 ml-0 md:pt-0 mt-8 md:mt-0">
          <div className="markbar md:markbarmd w-full">
            <div className="markbarcon md:markarconmd md:mt-0 md:mb-0">
              <InfoCard
                title={`My Staked ${currPool.nftSymbol}`}
                subtitle={`NFT's in Staking`}
                pid={poolId}
                src="staked.png"
                content={
                  <>
                    <div className="flex-row content-center">
                      <div className="w-full text-center">
                        <CountUp
                          duration={3}
                          useEasing
                          className="counter"
                          end={totalStaked}
                        />
                      </div>
                      <div className="w-full text-center">
                        {currPool.nftName}
                      </div>
                    </div>
                  </>
                }
                footer={
                  <span className="w-full text-center text-md">
                    NFT&apos;s Staked
                  </span>
                }
              />
            </div>

            <div className="markbarcon md:markarconmd lg:ml-5 md:mt-0 md:mb-0">
              <InfoCard
                title="My Rewards"
                pid={poolId}
                subtitle="Rewards Per Day"
                src="rewards.png"
                chart={<>{chartData && chartData.length > 0 ? (
                  <div className="fixed w-[200px] h-full top-0 left-0 pt-10 pb-5 pl-5 pr-8 md:pr-5 z-0">
                    <StakingChart data={chartData} />
                  </div>
                ) : null}</>}
                content={
                  <>
                    <div className="flex-row content-center">
                      {totalStaked && totalStaked > 1 ? (
                        rewardsAmount && (
                          <>
                            <CountUp
                              useEasing
                              decimals={currPool.rewardDecimalPlaces ?? 2}
                              className="counter drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                              end={rewardsAmount * totalStaked}
                            />
                          </>
                        )
                      ) : <>
                          <CountUp
                            useEasing
                            decimals={currPool.rewardDecimalPlaces ?? 2}
                            className="counter"
                            end={rewardsAmount}
                          />
                        </> ? (
                        rewardsAmount.toFixed(currPool.rewardDecimalPlaces)
                      ) : (
                        0
                      )}

                      <div className="w-full text-center">
                        {currPool.rewardSymbol}
                      </div>
                    </div>
                  </>
                }
                footer={
                  <span className="w-full text-center text-md">
                    Daily Staking Rewards
                  </span>
                }
              />
            </div>

            <div className="markbarcon md:markarconmd lg:ml-5 md:mt-0 md:mb-0">
              <InfoCard
                title={`My Wallet`}
                pid={poolId}
                subtitle="Reward tokens in Wallet"
                src="balance.png"
                content={
                  <>
                    <div className="flex-row justify-center content-center">
                      <div className="w-full text-center">
                        {currPool.is404 ? (
                          <>
                            <CountUp
                              useEasing
                              decimals={currPool.rewardDecimalPlaces ?? 2}
                              className="counter"
                              end={dn404RewardBalance}
                            />
                          </>
                        ) : (
                          <>
                            <CountUp
                              useEasing
                              decimals={currPool.rewardDecimalPlaces ?? 2}
                              className="counter"
                              end={tokenBalance}
                            />
                          </>
                        )}
                      </div>
                      <div className="w-full text-center">
                        {currPool.rewardSymbol}
                      </div>
                    </div>
                  </>
                }
                actionText="Import Token to Wallet"
                action={
                  <a onClick={() => watchReward(currPool)}>
                    <Button
                      size="sm"
                      variant="solid"
                      color="secondary"
                      className="ml-2 mr-2 my-1"
                    >
                      Add to Wallet
                    </Button>
                  </a>
                }
              />
            </div>
            <div className="markbarcon md:markarconmd lg:ml-5 md:mt-0 md:mb-0">
              <InfoCard
                title="Pending Rewards"
                subtitle="Claim staking rewards"
                pid={poolId}
                src="pending.png"
                content={
                  <>
                    <div className="flex-row justify-center w-full">
                      <div className="w-full text-center">
                        <CountUp
                          useEasing
                          duration={3}
                          decimals={currPool.rewardDecimalPlaces ?? 2}
                          className="counter"
                          end={Number(
                            pendingRewards?.toFixed(
                              currPool.rewardDecimalPlaces
                            )
                          )}
                        />
                      </div>
                      <div className="w-full text-center">
                        {currPool.rewardSymbol}
                      </div>
                    </div>
                  </>
                }
                action={
                  <Button
                    size="sm"
                    variant="solid"
                    color="primary"
                    className="rainbow-wrapper align-middle justify-center ml-2 mr-2 mt-2 w-[80px] my-1"
                    disabled={writeLoading || txPending}
                    isLoading={writeLoading || txPending}
                    onClick={claim}
                  >
                    <div className="flex rainbow-content align-middle justify-center h-full w-full">
                      <span className="top-[-25%] mt-[7px]">
                        {writeLoading || txPending ? "Wait" : "Claim All"}
                      </span>
                    </div>
                  </Button>
                }
                actionText="Claim Pending Staking Rewards"
              />
            </div>
          </div>
        </div>
      </aside>

      <div className="flex w-full justify-center items-center content-center flex-wrap pb-8">
        <div className="flex flex-col md:flex-row items-stretch justify-center w-[95%] md:mt-0 px-0 gap-5">
          <div className="lg:w-1/2 w-full flex-grow flex flex-col">
            <Card className="w-full content-center justify-center cards-nftstake">
              <CardHeader className="">
                <div className="w-full content-center text-center justify-center text-xl ml-5">
                  My {IfNull(currPool.nftSymbol, "NFT")} Wallet
                </div>
                <SortDropDown sortTarget="wallet" />
              </CardHeader>
              <CardBody className="overflow-clip">
                <div className="flex w-full justify-center items-center content-center">
                  <div className="flex w-full m-0 content-center justify-center">
                    {nftBalance > 0 && myTokenIds && myTokenIds.length > 0 ? (
                      <NftCarousel
                        targetKey="wallet"
                        nfts={myTokenIds}
                        currentPool={currPool}
                      />
                    ) : (
                      <img
                        src={barImgUrl("inwallet.png", currPool.pid)}
                        className="w-[150px] h-[150px]"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-full p-4">
                  <span className="text-center text-lg">
                    {nftBalance > 0 && nftBalance.toLocaleString()}{" "}
                    {nftBalance > 0
                      ? `Total ${currPool.nftSymbol} In Wallet`
                      : `No ${currPool.nftSymbol} In Wallet`}
                  </span>
                  <div className="flex justify-center pt-5">
                    <Button
                      size="md"
                      radius="none"
                      color="secondary"
                      variant="shadow"
                      className="rainbow-wrapper w-full md:w-[300px] my-4 text-md"
                      onClick={() => {
                        if (!isConnected) {
                          toast("Must Connect Wallet to Stake!", {
                            type: "error",
                          });
                        } else {
                          setSelectedStake([]);
                          onStakeOpen();
                        }
                      }}
                      startContent={
                        <img src="../images/default/pool.svg" width="30px" />
                      }
                    >
                      <div className="flex rainbow-content-lg align-middle justify-center h-full w-full">
                        <img
                          src="../images/default/pool.svg"
                          width="20px"
                          className="mx-2"
                        />{" "}
                        <span className="top-[-25%] mt-[7px]">
                          SELECT {IfNull(currPool.nftSymbol, "NFT")} TO STAKE
                        </span>
                      </div>
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-md text-gray-500">
                      {rewardsAmount > 0 ? (
                        `(Earn ${rewardsAmount.toLocaleString()} ${
                          currPool.rewardSymbol
                        } Per NFT Per Day)`
                      ) : (
                        <Skeleton
                          isLoaded={rewardsAmount > 0}
                          className="opacity-50 rounded-md"
                        >
                          Earn 0 TOKENS Per NFT Per Day
                        </Skeleton>
                      )}
                    </span>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="w-full content-center justify-center">
                <div className="flex w-full content-center justify-center">
                  <Button
                    size="lg"
                    color={!isApproved || !isConnected ? "danger" : "secondary"}
                    variant="shadow"
                    className="w-full md:w-[300px] my-4"
                    isLoading={writeLoading || txPending}
                    disabled={writeLoading || txPending}
                    onClick={() => {
                      if (!isConnected) {
                        toast("Must Connect Wallet to Stake!", {
                          type: "error",
                        });
                        openConnectModal();
                      } else {
                        if (!isApproved) {
                          approveAll();
                        } else {
                          batchStake();
                        }
                      }
                    }}
                  >
                    {!isConnected
                      ? `CONNECT WALLET`
                      : isApproved
                      ? writeLoading || txPending
                        ? "Please Wait..."
                        : `BATCH STAKE`
                      : `APPROVE ALL`}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:w-1/2 w-full flex-grow flex flex-col">
            <Card className="w-full content-center justify-center cards-nftstake">
              <CardHeader className="w-full content-center justify-center text-xl">
                <div className="w-full content-center text-center justify-center text-xl ml-5">
                  Staked {IfNull(currPool.nftSymbol, "NFTs")}
                </div>
                <SortDropDown sortTarget="staked" />
              </CardHeader>
              <CardBody className="overflow-clip">
                <div className="flex w-full justify-center items-center content-center overflow-hidden">
                  <div className="flex w-full m-0 content-center justify-center">
                    {stakedTokenIds && totalStaked > 0 ? (
                      <NftCarousel
                        targetKey="staked"
                        nfts={stakedTokenIds}
                        currentPool={currPool}
                      />
                    ) : (
                      <img
                        src={barImgUrl("staked.png", currPool.pid)}
                        className="w-[150px] h-[150px]"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-full p-4">
                  <span className="text-center text-lg">
                    {totalStaked > 0 ? (
                      <>
                        <CountUp
                          useEasing
                          duration={3}
                          className="counter"
                          end={IfNull(totalStaked, 0)}
                        />{" "}
                      </>
                    ) : null}
                    {totalStaked > 0 ? "Total" : "No"}{" "}
                    {IfNull(currPool.nftSymbol, "NFTs")} Currently Staked
                  </span>
                  <div className="flex justify-center pt-5">
                    <Button
                      size="md"
                      radius="none"
                      color="secondary"
                      variant="shadow"
                      className="rainbow-wrapper w-full md:w-[300px] my-4 text-md"
                      onClick={() => {
                        if (!isConnected) {
                          toast("Must Connect Wallet to Unstake!", {
                            type: "error",
                          });
                        } else {
                          setSelectedUnstake([]);
                          onUnstakeOpen();
                        }
                      }}
                      startContent={
                        <img src="../images/default/pool.svg" width="30px" />
                      }
                    >
                      <div className="flex rainbow-content-lg align-middle justify-center h-full w-full">
                        <img
                          src="../images/default/pool.svg"
                          width="20px"
                          className="mx-2"
                        />{" "}
                        <span className="top-[-25%] mt-[7px]">
                          SELECT {IfNull(currPool.nftSymbol, "NFT")} TO UNSTAKE
                        </span>
                      </div>
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-md text-gray-500">
                      {rewardsAmount > 0 ? (
                        `(${totalStakedNft.toLocaleString("en-US")} / ${
                          currPool.is404
                            ? dn404TotalSupply > 0
                              ? dn404TotalSupply
                              : maxSupply
                            : maxSupply.toLocaleString("en-US")
                        } Total Staked)`
                      ) : (
                        <Skeleton
                          isLoaded={rewardsAmount > 0}
                          className="opacity-50 rounded-lg"
                        >
                          Earn 0 TOKENS Per NFT Per Day
                        </Skeleton>
                      )}
                    </span>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <div className="flex w-full content-center justify-center">
                  <Button
                    size="lg"
                    color={!isApproved || !isConnected ? "danger" : "secondary"}
                    variant="shadow"
                    className="w-full md:w-[300px] my-4"
                    isLoading={writeLoading || txPending}
                    disabled={writeLoading || txPending}
                    onClick={() => {
                      if (!isConnected) {
                        toast("Must Connect Wallet to Unstake!", {
                          type: "error",
                        });
                        openConnectModal();
                      } else {
                        if (!isApproved) {
                          approveAll();
                        } else {
                          batchUnstake();
                        }
                      }
                    }}
                  >
                    {!isConnected
                      ? `CONNECT WALLET`
                      : isApproved
                      ? writeLoading || txPending
                        ? "Please Wait..."
                        : `BATCH UNSTAKE`
                      : `APPROVE ALL`}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Mint Button */}

      <div className="relative flex flex-col flex-1 items-center content-center mb-10">
        <div className="relative flex flex-col md:flex-row flex-nowrap justify-center items-center text-center content-center w-4/5 ml-15 mr-15">
          <div className="flex-1 md:w-5/6 w-full m-2">
            <a href={currPool.market1}>
              <Button
                size="lg"
                color="success"
                variant="shadow"
                className="w-full txtShadow md:w-64 md:mb-0"
                startContent={
                  <>
                    <img
                      src="../images/default/mantra.png"
                      width="30px"
                      height="30px"
                      aria-label="Mantra Logo"
                    />
                  </>
                }
              >
                Buy on Mantra
              </Button>
            </a>
          </div>
          {currPool.market2 && (
            <div className="flex-1 md:w-5/6 w-full m-2">
              <a href={currPool.market2}>
                <Button
                  size="lg"
                  color="success"
                  variant="shadow"
                  className="w-full txtShadow md:w-64"
                  startContent={
                    <>
                      <img
                        src="../images/nestx.png"
                        aria-label="NestX Logo"
                        width="30px"
                        height="39px"
                      />
                    </>
                  }
                >
                  Buy on NestX
                </Button>
              </a>
            </div>
          )}
          {currPool.is404 ? (
            <div className="flex-1 md:w-5/6 w-full m-2">
              <a href={`${chewyLink}`}>
                <Button
                  size="lg"
                  color="success"
                  variant="shadow"
                  className="w-full txtShadow md:w-64"
                  startContent={
                    <>
                      <img
                        src="../images/default/chewy.gif"
                        width="40px"
                        height="40px"
                        className="scale-x-[-1]"
                      />
                    </>
                  }
                >
                  Buy on ChewySwap
                </Button>
              </a>
            </div>
          ) : (
            isConnected &&
            totalSupply &&
            maxSupply &&
            totalSupply < maxSupply && (
              <div className="flex-1 md:w-5/6 w-full m-2">
                <Button
                  size="lg"
                  color="success"
                  variant="shadow"
                  className="w-full txtShadow md:w-64"
                  startContent={
                    <>
                      <img
                        src="../images/logo.png"
                        width="30px"
                        height="30px"
                      />
                    </>
                  }
                  disabled={writeLoading || txPending}
                  isLoading={writeLoading || txPending}
                  onClick={onMintOpen}
                >
                  {writeLoading || txPending ? (
                    <>{txPending ? "Confirm in Wallet..." : "Pending..."}</>
                  ) : (
                    `Mint ${currPool.nftSymbol}`
                  )}
                </Button>
              </div>
            )
          )}
          {isOwner ? (
            <div className="flex-1 md:w-5/6 w-full m-2">
              <Button
                size="lg"
                color="success"
                variant="shadow"
                className="w-full txtShadow md:w-64"
                startContent={
                  <>
                    <UserRoundCog size={30} />
                  </>
                }
                disabled={writeLoading || txPending}
                isLoading={writeLoading || txPending}
                onClick={onAdminOpen}
              >
                {writeLoading || txPending ? (
                  <>{txPending ? "Confirm in Wallet..." : "Pending..."}</>
                ) : (
                  `Admin Settings`
                )}
              </Button>
            </div>
          ) : null}
          <div className="flex-1 md:w-5/6 w-full m-2">
            <SettingsButton className="w-full txtShadow md:w-64" size="lg" />
          </div>

          {/*}
              <div className="flex-1 md:w-5/6 w-full m-2">
                 <DeployButton
                  className="w-full txtShadow md:w-64"
                  size="lg"
                  toast={toast}
                />
              </div>
              */}
        </div>
      </div>

      <div className="relative flex flex-col flex-1 items-center content-center mb-5">
        {currPool.aboutTitle1 && (
          <Accordion variant="shadow" className="md:w-3/6">
            <AccordionItem
              key="1"
              aria-label={`${currPool.aboutTitle1} - ${currPool.aboutContent1}`}
              title={`${currPool.aboutTitle1}`}
            >
              {currPool.aboutContent1}
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label={`${currPool.aboutTitle2} - ${currPool.aboutContent2}`}
              title={`${currPool.aboutTitle2}`}
            >
              {currPool.aboutContent2}
            </AccordionItem>
          </Accordion>
        )}
      </div>
      <div className="relative flex flex-col flex-1 items-center content-center">
        <div className="relative flex flex-col md:flex-row flex-nowrap justify-center items-center text-center content-center w-4/5 ml-15 mr-15">
          {isConnected && (
            <div className="flex-1 md:w-5/6 w-full m-2">
              <Button
                color="default"
                variant="shadow"
                className="w-full txtShadow md:w-64"
                onClick={() => watchReward}
                startContent={
                  <>
                    <WalletIcon
                      width={40}
                      height={40}
                      className="text-white p-2"
                    />
                  </>
                }
              >
                Add{" "}
                {currPool.rewardSymbol === "WSKULLZ"
                  ? "SKULLZ"
                  : currPool.rewardSymbol}{" "}
                to Wallet
              </Button>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isStakeOpen}
        onOpenChange={onStakeOpenChange}
        backdrop="blur"
        size={myTokenIds && myTokenIds?.length > 12 ? "5xl" : "xl"}
        placement="center"
        scrollBehavior="inside"
        className={cn("cards-modal", customFont.className)}
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <RowBetween>
                  <div className="text-xl font-bold">
                    Select {currPool.nftSymbol} to Stake
                  </div>
                  {myTokenIds && myTokenIds.length > 1 && (
                    <SortDropDown
                      sortTarget="stakeModal"
                      className="mr-3 mt-2"
                    />
                  )}
                </RowBetween>
              </ModalHeader>
              <ModalBody>
                <ScrollShadow className="w-full h-full" size={15}>
                  <div className="tokenIds2">
                    {myTokenIds &&
                      nftSort(myTokenIds, sortNftSetting["stakeModal"]).map(
                        (id) => (
                          <>
                            <div
                              key={`wallet_${
                                (currPool && currPool.pid) ?? 1
                              }_${id}_div1`}
                              className={`relative md:mr-2 ${
                                selectedStake.includes(id)
                                  ? "stakeimgselect"
                                  : "stakeimg"
                              } group`}
                              onClick={() => handleStakeClick(id)}
                            >
                              <img
                                key={`wallet_${
                                  (currPool && currPool.pid) ?? 1
                                }_${id}_img`}
                                src={`${currPool.nftUri}${id.toString()}${
                                  currPool.nftExt
                                }`}
                                alt={id.toString()}
                                className={
                                  selectedStake.includes(id)
                                    ? "nftthumbselect"
                                    : "nftthumb"
                                }
                              />
                              <div
                                key={`wallet_${
                                  (currPool && currPool.pid) ?? 1
                                }_${id}_div2`}
                                className={`group text-center content-center ${
                                  !selectedStake.includes(id) && "hidden"
                                } group-hover:block transition ease-in-out`}
                              >
                                <div
                                  key={`wallet_${
                                    (currPool && currPool.pid) ?? 1
                                  }_${id}_div3`}
                                  className={`absolute text-center font-bold text-sm inset-0 selectedShadow`}
                                >
                                  <mark
                                    key={`wallet_${
                                      (currPool && currPool.pid) ?? 1
                                    }_${id}_mark`}
                                    className={`idText rounded-md px-1 py-[2px] font-bold ${customFont.className}`}
                                  >
                                    #{id.toString()}
                                  </mark>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      )}
                    {(!myTokenIds || myTokenIds.length < 1) && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ x: 0, opacity: 1, scale: 1.2 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{
                            delay: 0.35,
                            times: [0, 0.1, 0.9, 1],
                            type: "spring",
                            duration: 0.5,
                            bounce: 0.5,
                          }}
                          className="relative text-center pt-10 pb-10"
                        >
                          No NFT&apos;s in Wallet to Stake!
                        </motion.div>
                        <motion.div
                          initial={{ x: 300, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -300, opacity: 0 }}
                          transition={{
                            delay: 0.1,
                            type: "spring",
                            duration: 0.5,
                            bounce: 0.5,
                          }}
                          className="relative flex flex-2 w-full justify-center items-center"
                        >
                          <div className="relative flex flex-col md:flex-row flex-nowrap justify-center items-center text-center content-center w-4/5 ml-15 mr-15">
                            <div className="flex-1 md:w-5/6 w-full m-2">
                              <a href={currPool.market1}>
                                <Button
                                  size="lg"
                                  color="success"
                                  variant="shadow"
                                  className="w-full md:w-64"
                                  startContent={
                                    <>
                                      <img
                                        src="../images/default/mantra.png"
                                        width="30px"
                                        height="30px"
                                      />
                                    </>
                                  }
                                >
                                  Buy on Mantra
                                </Button>
                              </a>
                            </div>

                            {currPool.is404 ? (
                              <div className="flex-1 md:w-5/6 w-full m-2">
                                <a href={`${chewyLink}`}>
                                  <Button
                                    size="lg"
                                    color="success"
                                    variant="shadow"
                                    className="w-full md:w-64"
                                    startContent={
                                      <>
                                        <img
                                          src="../images/chewy.gif"
                                          width="40px"
                                          height="40px"
                                          className="scale-x-[-1]"
                                        />
                                      </>
                                    }
                                  >
                                    Buy on ChewySwap
                                  </Button>
                                </a>
                              </div>
                            ) : totalSupply &&
                              maxSupply &&
                              totalSupply < maxSupply ? (
                              <div className="flex-1 md:w-5/6 w-full m-2">
                                <Button
                                  size="lg"
                                  color="success"
                                  variant="shadow"
                                  className="w-full md:w-64"
                                  startContent={
                                    <>
                                      <img
                                        src="../images/logo.png"
                                        width="30px"
                                        height="30px"
                                      />
                                    </>
                                  }
                                  disabled={writeLoading || txPending}
                                  isLoading={writeLoading || txPending}
                                  onClick={onMintOpen}
                                >
                                  {writeLoading || txPending ? (
                                    <>
                                      {txPending
                                        ? "Confirm in Wallet..."
                                        : "Pending..."}
                                    </>
                                  ) : (
                                    `Mint ${currPool.nftSymbol}`
                                  )}
                                </Button>
                              </div>
                            ) : null}
                          </div>
                        </motion.div>
                        {currPool.is404 ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                              delay: 0.6,
                              times: [0, 0.1, 0.9, 1],
                              type: "spring",
                              duration: 0.5,
                              bounce: 0.5,
                            }}
                            className="relative text-center pt-10"
                          >
                            <a
                              href="https://medium.com/@gavinrobert/dn404-changes-the-game-9910c065a9f1"
                              target="_new"
                            >
                              About DN404: For Every 1 Full {currPool.nftSymbol}{" "}
                              token owned you receieve 1 NFT
                            </a>
                          </motion.div>
                        ) : null}
                      </>
                    )}
                  </div>
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Popover>
                  <PopoverTrigger>
                    <Button aria-label="Help with Staking" radius="full">
                      Help!
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">
                        Tap to select which NFT&apos;s you&apos;d like to Stake
                      </div>
                      <div className="text-small font-bold">
                        Then press &quot;Stake Selected&quot; to Stake those
                        NFT&apos;s
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                {selectedStake.length === 1 && (
                  <Button
                    color="success"
                    isIconOnly
                    onPress={() => {
                      watchNft(selectedStake[0], currPool);
                    }}
                  >
                    <WalletIcon width={35} height={35} />
                  </Button>
                )}

                <Button
                  color="success"
                  onPress={() => {
                    if (!myTokenIds || myTokenIds.length < 1) {
                      onClose();
                      return;
                    }
                    if (!isApproved) {
                      approveAll();
                    } else {
                      if (selectedStake.length < 1) {
                        toast("Must Select at Least 1 NFT to Stake!", {
                          type: "error",
                        });
                      } else {
                        if (isApproved) {
                          stake();
                          onClose();
                        } else {
                          approveAll();
                        }
                      }
                    }
                  }}
                >
                  {myTokenIds && myTokenIds.length > 0
                    ? isApproved
                      ? "Stake Selected"
                      : "Approve All"
                    : "Close"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isUnstakeOpen}
        onOpenChange={onUnstakeOpenChange}
        backdrop="blur"
        size={stakedTokenIds && stakedTokenIds?.length > 12 ? "5xl" : "lg"}
        placement="center"
        scrollBehavior="inside"
        className={cn("cards-modal", customFont.className)}
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <RowBetween>
                  <div className="text-xl font-bold">
                    Select {currPool.nftSymbol} to Stake
                  </div>
                  {stakedTokenIds && stakedTokenIds.length > 1 && (
                    <SortDropDown
                      sortTarget="unstakeModal"
                      className="mr-3 mt-2"
                    />
                  )}
                </RowBetween>
              </ModalHeader>
              <ModalBody>
                <ScrollShadow className="w-full h-full" size={15}>
                  <div className="tokenIds2">
                    {stakedTokenIds &&
                      nftSort(
                        stakedTokenIds,
                        sortNftSetting["unstakeModal"]
                      ).map((id) => (
                        <>
                          <div
                            key={`staked_${
                              (currPool && currPool.pid) ?? 1
                            }_${id}_div1`}
                            className={`relative md:mr-2 ${
                              selectedUnstake.includes(id)
                                ? "stakeimgselect"
                                : "stakeimg"
                            } group`}
                            onClick={() => handleUnstakeClick(id)}
                          >
                            <img
                              key={`staked_${
                                (currPool && currPool.pid) ?? 1
                              }_${id}_img`}
                              src={`${currPool.nftUri}${id.toString()}${
                                currPool.nftExt
                              }`}
                              alt={id.toString()}
                              className={
                                selectedUnstake.includes(id)
                                  ? "nftthumbselect"
                                  : "nftthumb"
                              }
                            />
                            <div
                              key={`staked_${
                                (currPool && currPool.pid) ?? 1
                              }_${id}_div2`}
                              className={`group text-center content-center ${
                                !selectedUnstake.includes(id) && "hidden"
                              } group-hover:block transition-opacity ease-in-out duration-1000`}
                            >
                              <div
                                key={`staked_${
                                  (currPool && currPool.pid) ?? 1
                                }_${id}_div3`}
                                className={`absolute text-center font-bold text-sm inset-0 selectedShadow`}
                              >
                                <mark
                                  key={`staked_${
                                    (currPool && currPool.pid) ?? 1
                                  }_${id}_mark`}
                                  className={`idText rounded-md px-1 py-[2px] font-bold ${customFont.className}`}
                                >
                                  #{id.toString()}
                                </mark>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    {(!stakedTokenIds || stakedTokenIds.length < 1) && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ x: 0, opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{
                            delay: 0.35,
                            times: [0, 0.1, 0.9, 1],
                            type: "spring",
                            duration: 0.5,
                            bounce: 0.5,
                          }}
                          className="relative text-center pt-10 pb-10"
                        >
                          No NFT&apos;s Currently Staked! Purchase{" "}
                          {currPool.nftName} at the following:
                        </motion.div>
                        <motion.div
                          initial={{ x: 300, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -300, opacity: 0 }}
                          transition={{
                            delay: 0.1,
                            type: "spring",
                            duration: 0.5,
                            bounce: 0.5,
                          }}
                          className="relative flex flex-2 w-full justify-center items-center"
                        >
                          <div className="relative flex flex-col md:flex-row flex-nowrap justify-center items-center text-center content-center w-4/5 ml-15 mr-15">
                            <div className="flex-1 md:w-5/6 w-full m-2">
                              <a href={currPool.market1}>
                                <Button
                                  size="lg"
                                  color="success"
                                  variant="shadow"
                                  className="w-full md:w-64"
                                  startContent={
                                    <>
                                      <img
                                        src="../images/default/mantra.png"
                                        width="30px"
                                        height="30px"
                                      />
                                    </>
                                  }
                                >
                                  Buy on Mantra
                                </Button>
                              </a>
                            </div>
                            {currPool.market2 && (
                              <div className="flex-1 md:w-5/6 w-full m-2">
                                <a href={currPool.market2}>
                                  <Button
                                    size="lg"
                                    color="success"
                                    variant="shadow"
                                    className="w-full md:w-64"
                                    startContent={
                                      <>
                                        <img
                                          src="../images/nestx.png"
                                          width="30px"
                                          height="39px"
                                        />
                                      </>
                                    }
                                  >
                                    Buy on NestX
                                  </Button>
                                </a>
                              </div>
                            )}
                            {currPool.is404 ? (
                              <div className="flex-1 md:w-5/6 w-full m-2">
                                <a href={`${chewyLink}`}>
                                  <Button
                                    size="lg"
                                    color="success"
                                    variant="shadow"
                                    className="w-full md:w-64"
                                    startContent={
                                      <>
                                        <img
                                          src="../images/chewy.gif"
                                          width="40px"
                                          height="40px"
                                          className="scale-x-[-1]"
                                        />
                                      </>
                                    }
                                  >
                                    Buy on ChewySwap
                                  </Button>
                                </a>
                              </div>
                            ) : (
                              totalSupply &&
                              maxSupply &&
                              totalSupply < maxSupply && (
                                <div className="flex-1 md:w-5/6 w-full m-2">
                                  <Button
                                    size="lg"
                                    color="success"
                                    variant="shadow"
                                    className="w-full md:w-64"
                                    startContent={
                                      <>
                                        <img
                                          src="../images/logo.png"
                                          width="30px"
                                          height="30px"
                                        />
                                      </>
                                    }
                                    disabled={writeLoading || txPending}
                                    isLoading={writeLoading || txPending}
                                    onClick={() => {
                                      onClose();
                                      onMintOpen();
                                    }}
                                  >
                                    {writeLoading || txPending ? (
                                      <>
                                        {txPending
                                          ? "Confirm in Wallet..."
                                          : "Pending..."}
                                      </>
                                    ) : (
                                      `Mint ${currPool.nftSymbol}`
                                    )}
                                  </Button>
                                </div>
                              )
                            )}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </div>
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Popover>
                  <PopoverTrigger>
                    <Button aria-label="Help with Unstaking" radius="full">
                      Help!
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">
                        Tap to select one or multiple NFT&apos;s to Unstake
                      </div>
                      <div className="text-small font-bold">
                        Then press the &quot;Unstake&quot; to Continue
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  color="success"
                  onPress={() => {
                    if (
                      !stakedTokenIds ||
                      (stakedTokenIds && stakedTokenIds.length < 1)
                    ) {
                      onClose();
                      return;
                    }
                    if (selectedUnstake.length < 1) {
                      toast("Must Select at Least 1 NFT to Unstake!", {
                        type: "error",
                      });
                    } else {
                      unstake();
                      onClose();
                    }
                  }}
                >
                  {!stakedTokenIds ||
                  (stakedTokenIds && stakedTokenIds.length < 1)
                    ? "Close"
                    : "Unstake Selected"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isMintOpen}
        onOpenChange={onMintOpenChange}
        backdrop="blur"
        placement="center"
        scrollBehavior="inside"
        className={cn("cards-modal", customFont.className)}
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Mint {currPool.nftName} NFT&apos;s
              </ModalHeader>
              <ModalBody>
                <ScrollShadow className="w-full h-full" size={15}>
                  <div className="relative flex flex-col flex-1 items-center content-center">
                    <div className="flex justify-center items-center mb-4">
                      <img src="../images/nft.gif" className="w-1/2" />
                    </div>
                    <div className="text-3xl font-bold mb-4">
                      {totalSupply} / {maxSupply}
                    </div>
                    <div className="text-lg font-bold">
                      1 {currPool.nftSymbol} Costs {nftCost} BONE
                    </div>
                    <div className="text-sm mb-5">(Excluding ⛽️ Gas Fees)</div>
                    <div className="inline-block">
                      <Button
                        size="sm"
                        radius="full"
                        className="w-[30px] mr-5"
                        onClick={() => {
                          if (mintAmount > 1) {
                            setMintAmount(mintAmount - 1);
                          }
                        }}
                      >
                        -
                      </Button>
                      {mintAmount}
                      <Button
                        size="sm"
                        radius="full"
                        className="w-[30px] ml-5"
                        onClick={() => {
                          if (mintAmount < (currPool.nftMaxMint ?? 10)) {
                            setMintAmount(mintAmount + 1);
                          }
                        }}
                      >
                        +
                      </Button>
                    </div>
                    <div
                      className={
                        accountBalance.data &&
                        nftCost * mintAmount * 10 ** 18 <
                          accountBalance.data.value.valueOf()
                          ? `mt-5`
                          : `mt-5 text-red-500`
                      }
                    >
                      Total Cost: {nftCost * mintAmount} BONE
                    </div>
                    {accountBalance.data && (
                      <div className="mt-2">
                        Balance:{" "}
                        {Number(
                          formatUnits(accountBalance.data.value.valueOf(), 18)
                        ).toFixed(2)}{" "}
                        BONE
                      </div>
                    )}
                  </div>
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Popover>
                  <PopoverTrigger>
                    <Button radius="full">Help!</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">
                        Select how many NFT&apos;s to Mint
                      </div>
                      <div className="text-small font-bold">
                        Then press &quot;Mint&quot; to Continue
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  color="success"
                  onPress={() => {
                    if (
                      accountBalance.data &&
                      nftCost * mintAmount * 10 ** 18 >
                        accountBalance.data.value.valueOf()
                    ) {
                      toast("Insufficient Balance!", { type: "error" });
                    } else {
                      mint(mintAmount);
                      onClose();
                      onStakeOpen();
                    }
                  }}
                >
                  Mint
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isAdminOpen}
        onOpenChange={onAdminOpenChange}
        backdrop="blur"
        placement="center"
        scrollBehavior="inside"
        className={cn("cards-modal", customFont.className)}
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {/*openWrapUi && "Wrap " */}
                {currPool.nftName}
                {isOwner && " Admin Controls"}
              </ModalHeader>
              <ModalBody>
                {isOwner && (
                  <>
                    <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
                      <Input
                        type="text"
                        value={adminRewardsAmount}
                        onValueChange={setAdminRewardsAmount}
                        label={`Rewards Amount (${rewardsAmount} Currently)`}
                        placeholder={`Total ${currPool.rewardSymbol} Rewards Per NFT Per Day`}
                      />
                    </div>
                    <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
                      <Button
                        color="success"
                        className="w-full"
                        startContent={
                          <>
                            <Bolt size={28} />
                          </>
                        }
                        onPress={() => {
                          if (!isOwner) {
                            toast("Not Owner!", { type: "error" });
                          } else if (Number(adminRewardsAmount) > 0) {
                            setRewardsAmount(adminRewardsAmount);
                          } else {
                            toast("ERROR: Amount not greater than zero!", {
                              type: "error",
                            });
                          }
                        }}
                      >
                        Set Rewards Per NFT Per Day
                      </Button>
                      <Divider />
                    </div>
                  </>
                )}
                {currPool.isWrapped && (
                  <>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center content-center items-center">
                      <Input
                        type="number"
                        value={wrapAmount}
                        onValueChange={setWrapAmount}
                        label={`Add ${currPool.rewardSymbol} Tokens`}
                        placeholder={`Amount of ${currPool.rewardSymbol} to Add`}
                      />
                      <Button
                        size="md"
                        color="success"
                        className="flex flex-col items-center w-full md:w-[100px]"
                        onPress={() => {
                          if (wrapAmount && Number(wrapAmount) > 0) {
                            wrap(wrapAmount);
                          } else {
                            toast("Invalid Amount!", { type: "error" });
                          }
                        }}
                      >
                        {currPool.is404 && Number(wrapAmount) > wrapAllowance
                          ? "Approve"
                          : "Wrap"}
                      </Button>
                    </div>
                  </>
                )}
                <Divider />
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center content-center items-center">
                  <Input
                    type="number"
                    value={adminSendAmount}
                    onValueChange={setAdminSendAmount}
                    label={`Fill up Staking Rewards Pool`}
                    placeholder={`Amount of ${currPool.rewardSymbol} to Send`}
                  />
                  <Button
                    size="md"
                    color="success"
                    className="flex flex-col items-center w-full md:w-[100px]"
                    onPress={() => {
                      setAdminSendAmount(
                        (currPool.is404
                          ? dn404RewardBalance
                          : tokenBalance
                        ).toFixed(currPool.rewardDecimalPlaces)
                      );
                    }}
                  >
                    MAX
                  </Button>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Button
                    color="secondary"
                    className="w-full"
                    disabled={
                      !(
                        (currPool.is404 ? dn404RewardBalance : tokenBalance) > 0
                      )
                    }
                    startContent={
                      <>
                        <Landmark size={28} />
                      </>
                    }
                    onPress={() => {
                      if (address) {
                        fillStakingRewards(String(adminSendAmount));
                      }
                    }}
                  >
                    {twAllowance < Number(adminSendAmount)
                      ? "Approve"
                      : `Send ${currPool.rewardSymbol} to Staking`}
                  </Button>
                </div>
                <Divider />
                {isOwner && (
                  <>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center text-sm">
                      Pool Rewards Balance:{" "}
                      <span className="text-green-500">
                        {(currPool.is404
                          ? staking404RewardBalance
                          : stakingRewardBalance
                        ).toFixed(currPool.rewardDecimalPlaces)}{" "}
                        {currPool.rewardSymbol}
                      </span>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center text-sm">
                      Distributed Per Day:{" "}
                      <span className="text-green-500">
                        {(rewardsAmount * totalStakedNft).toFixed(
                          currPool.rewardDecimalPlaces
                        )}{" "}
                        {currPool.rewardSymbol}
                      </span>
                      <Popover size="sm">
                        <PopoverTrigger>
                          <Info className="mt-[3px]" size={15} />
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 text-center">
                            <div className="text-small font-bold">
                              Tokens distributed per day is an estimate based on
                              # of NFT&apos;s staked assuming rewards are
                              claimed daily
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center text-sm">
                      Time Rewards Will Last:{" "}
                      <span className="text-green-500 ml-0 mr-0">
                        {currPool.is404
                          ? (
                              staking404RewardBalance /
                              (rewardsAmount * totalStakedNft)
                            ).toFixed(2)
                          : (
                              stakingRewardBalance /
                              (rewardsAmount * totalStakedNft)
                            ).toFixed(2)}{" "}
                        Days
                      </span>
                      <Popover size="sm">
                        <PopoverTrigger>
                          <Info className="mt-[3px]" size={15} />
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 text-center">
                            <div className="text-small font-bold">
                              Estimate assumes that rewards are claimed daily,
                              your mileage may vary
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </>
                )}
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center text-sm">
                  Reward Tokens in Wallet:{" "}
                  <span className="text-green-500">
                    {(currPool.is404
                      ? dn404RewardBalance
                      : tokenBalance
                    ).toFixed(currPool.rewardDecimalPlaces)}{" "}
                    {currPool.rewardSymbol}
                  </span>
                </div>
                {isAdvanced && (
                  <>
                    <Divider />
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input
                        type="text"
                        color="danger"
                        value={adminRewardsAmount}
                        onValueChange={setAdminRewardsAmount}
                        label={`Transfer Staking Contract Ownership`}
                        placeholder={`Address to Transfer Ownership`}
                      />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Button
                        color="danger"
                        className="w-full"
                        onPress={() => {
                          if (!isOwner) {
                            toast("Not Owner!", { type: "error" });
                          } else {
                            setRewardsAmount(adminRewardsAmount);
                            onClose();
                          }
                        }}
                      >
                        Transfer Ownership (Cannot be Undone)
                      </Button>
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Popover size="sm">
                  <PopoverTrigger>
                    <Button aria-label="More info" radius="full">
                      More Info
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2 text-center">
                      <div className="text-small font-bold">
                        * Tokens distributed per day is an estimate based on #
                        of tokens
                      </div>
                      <div className="text-small font-bold mb-2">
                        staked assuming people claim every day
                      </div>
                      <div className="text-small font-bold inline-flex md:items-center">
                        <Info size={15} /> &nbsp;Rewards are set per NFT per
                        day, decimals are permitted
                      </div>
                      <div className="text-small font-bold md:items-center">
                        <span className="inline-flex md:items-center">
                          <Info size={15} /> &nbsp;Staking rewards are filled by
                          sending Reward tokens to the
                        </span>
                      </div>
                      <div className="text-small font-bold md:items-center">
                        staking pool{" "}
                        <span className="text-green-500">
                          <a
                            href={`https://www.shibariumscan.io/address/${currPool.address}`}
                            target="_new"
                          >
                            smart contract
                          </a>
                        </span>{" "}
                        or through this UI
                      </div>
                      {currPool.isWrapped && (
                        <div className="text-small font-bold md:items-center mt-2">
                          <span className="inline-flex md:items-center text-yellow-500">
                            <Info size={15} /> &nbsp;Pool reward is wrapped, use
                            this UI to wrap before filling pool
                          </span>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  color="danger"
                  onPress={() => {
                    onClose();
                  }}
                >
                  Exit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
