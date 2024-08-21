// app/products/[categorySlug]/[productId]/page.js

import { currentPoolIdAtom } from "@/config/atoms";
import {
  ChainId,
  fallbackChainId,
  fallbackChainName,
} from "@/constants/chain-specific";
import { NftPoolConfig, NftPoolConfigType } from "@/constants/types";
import {
  getAllChainIdNumbers,
  getChainIdStringByNumber,
  getPoolIdByNftPoolConfig,
  getPoolNamesByChainId,
  matchNftPoolConfigBySlugifiedName,
  slugifyPoolNames,
} from "@/util/index";
import { useAtom } from "jotai";
import "react-toastify/dist/ReactToastify.css";
import StakingPool from "./StakingPool";
import { pageTitle, POOL_CONFIG } from "@/constants/index";
import { redirect } from "next/navigation";
import { getPoolSlug } from "@/util/index";
import NotFound from "app/not-found";
import PoolPreview from "./PoolPreview";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const currPool: NftPoolConfigType | undefined = POOL_CONFIG[fallbackChainId][1];


   // redirect(`/nft-staking/${getPoolSlug(currPool)}`);


  if (!currPool) {
    return (
      <div>
        <PoolPreview />
      </div>
    );
  }

  return (
    <div>
      <PoolPreview />
    </div>
  );
}
