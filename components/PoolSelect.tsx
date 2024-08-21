"use client";
/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import ConnectButton from "../components/ConnectButton";
import StakingLogo from "./StakingLogo";
import {
  ChainId,
  multiPool,
  pageTitle,
  NftPoolConfig,
  NftPoolConfigType,
  PoolId,
  telegram,
  twitter,
  website,
} from "../constants";
import {
  getPoolIdByNftPoolConfig,
  getPoolIdBySlug,
  getPoolName,
  getPoolNamesByChainId,
  getPoolSettings,
  getSlugByPoolId,
  matchNftPoolConfigBySlugifiedName,
} from "../util";
import { useAccount } from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { currentPoolIdAtom, lastPoolIdAtom } from "../config/atoms";
import { useAtom } from "jotai";
import TransitionLink from "./Transition";

type PoolSelectProps = {
  NftPoolConfig: NftPoolConfigType | undefined;
  poolSlug: string;
  className?: string;
  mobileOnly?: boolean;
};

export function PoolSelect({NftPoolConfig, poolSlug, className, mobileOnly = false}: PoolSelectProps) {
  const pathname = usePathname();
  console.log(pathname);
  const currPoolId = getPoolIdBySlug(pathname.slice(13));
  const { address, chainId, isConnecting, isDisconnected, isConnected } =
    useAccount();
  const router = useRouter();
  // let currPool = NftPoolConfig ?? getPoolSettings(chainId, 1);
  const [currPool, setCurrPool] = useState<NftPoolConfigType | undefined>(
    NftPoolConfig
  );
  let poolNames = getPoolNamesByChainId(chainId ?? ChainId.SHIBARIUM);

  if (!pathname.includes("nft-staking/")) {
    return null;
  }

  const selectLink = (poolId: number) => {
    return `/${getSlugByPoolId(poolId, chainId) ?? ''}`;
  };

  return (
    <>
      <Select
        label="Current Pool"
        placeholder={getPoolName(chainId, currPoolId)}
        selectionMode="single"
        className={`${mobileOnly ? 'max-w-xs content-center m:hidden pt-2 items-center' : 'w-[225px]'} content-center bg-transparent`}
        defaultSelectedKeys={[`PoolId_${currPoolId}`]}
        onSelectionChange={(pool) => {
          const currentId = Object.values(pool)[0] as string; // Cast 'currentId' to number type
          // setPoolId(currentId);
          const newId = Number(currentId.replace("PoolId_", ""));
          console.log("Current ID: ", currentId);
          console.log("New ID: ", newId);
          console.log(getSlugByPoolId(newId, chainId));
          router.push(`/nft-staking/${getSlugByPoolId(newId, chainId)}`);
        }}
      >
        {poolNames &&
          poolNames.map((name, index) => (
            <SelectItem key={`PoolId_${index + 1}`} value={index + 1}>
              {name}
            </SelectItem>
          ))}
      </Select>
    </>
  );
}
