"use client";
import React from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import {
  getPoolNamesByChainId,
  matchNftPoolConfigBySlugifiedName,
  slugifyString,
} from "@/util/index";
import { useAccount } from "wagmi";
import { ChainId, fallbackChainId } from "@/constants/chain-specific";
import PoolListItem from "./PoolListItem";
import { POOL_CONFIG } from "@/constants/project-specific/pools";

export default function PoolPreview() {
  const { address, chainId, isConnecting, isDisconnected, isConnected } =
    useAccount();

  const poolNames = getPoolNamesByChainId(chainId ?? ChainId.SHIBARIUM);

  return (
    <div className="flex flex-col pt-6 justify-center items-center w-full">
      <div className="flex flex-col w-full md:w-3/4 lg:w-3/5">
        {poolNames &&
          poolNames.map((name, index) => (
            <div
              className="flex flex-col w-full justify-center content-center items-center"
              key={`PoolPreviews_${index + 1}`}
            >
              <PoolListItem
                key={`PoolPreviews_${index + 1}`}
                NftPoolConfig={matchNftPoolConfigBySlugifiedName(slugifyString(name))}
                poolId={index + 1}
                chainIdNum={chainId}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
