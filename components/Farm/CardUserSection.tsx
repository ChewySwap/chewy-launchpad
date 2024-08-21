"use client";

import { FarmConfig, MasterChefConfig } from "@/constants/project-specific/farms/types";
import { ButtonOverride as Button } from "@/components/Buttons/ButtonOverride";
import Col from "@/components/Layout/Flex/Col";
import Row from "@/components/Layout/Flex/Row";
import { useDisclosure } from "@nextui-org/react";
import DepositModal from "./DepositModal";
import { useFarmUserData } from "@/hooks/useFarmUserData";
import { formatBalance } from "@/util/balance/formatBalance";
import { fallbackChainId } from "@/constants/chain-specific";

type Farm = FarmConfig;
interface CardUserProps {
  farm: Farm;
  masterChef: MasterChefConfig;
  index: number;
}

export default function CardUserSection({ farm, index, masterChef }: CardUserProps) {
  const {
    isOpen: isDepositOpen,
    onOpen: onDepositOpen,
    onOpenChange: onDepositOpenChange,
  } = useDisclosure();

  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onOpenChange: onDetailsOpenChange,
  } = useDisclosure();

  const { pendingRewards, totalStaked } = useFarmUserData(farm, masterChef.chainId ?? fallbackChainId);

  return (
    <>
      <DepositModal
        isOpen={isDepositOpen}
        masterChef={masterChef}
        onOpenChange={onDepositOpenChange}
        tokenAddress={farm?.lpAddress}
        symbol={`${farm?.tokenA.symbol}${farm?.tokenB && `-${farm?.tokenB.symbol}`}`}
      />
      <Row className="justify-between pt-4">
        <Col className="w-full">
          <div className="text-xs truncate">EARNED:</div>
          <div className="w-full flex justify-start text-lg">{pendingRewards.formatted > 0 ? formatBalance(pendingRewards.formatted) : 0} {masterChef.rewardToken?.symbol ?? ""}</div>
        </Col>
        {pendingRewards.formatted > 0 ? (<Button variant="shadow" color="success" size="md" className="">
          Claim
        </Button>) : null}
      </Row>
      <Row className="justify-between pt-4">
        <Col className="">
          <div className={`text-xs`}>{`${farm?.tokenA.symbol}${farm?.tokenB?.symbol && `-${farm?.tokenB.symbol}`}`} STAKED:</div>
          <div className="w-full flex justify-start text-lg">{(totalStaked.formatted > 0 ? formatBalance(totalStaked.formatted) : 0) ?? 0}</div>
        </Col>
        <Row>
          <Button
            isIconOnly
            variant="faded"
            size="md"
            radius="md"
            className="text-2xl"
          >
            -
          </Button>
          <Button
            onClick={onDepositOpen}
            isIconOnly
            variant="faded"
            size="md"
            radius="md"
            className="ml-2 text-2xl"
          >
            +
          </Button>
        </Row>
      </Row>
    </>
  );
}
