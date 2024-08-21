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
import StakingPool from "./nft-staking/StakingPool";
import {
  baseUrl,
  chartPage,
  chewyLink,
  metaDescription,
  metaTitle,
  pageTitle,
  POOL_CONFIG,
  twitterAt,
  twitterId,
} from "@/constants/index";
import { redirect } from "next/navigation";
import { getPoolSlug } from "@/util/index";
import { Metadata } from "next";
import { getGeckoChartData } from "@/lib/price-data/geckoPrices";
import dayjs from "dayjs";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  bookmarks: [baseUrl, chartPage, chewyLink],
  category: "staking",
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
    siteId: twitterId,
    creator: twitterAt,
    creatorId: twitterId,
    images: [`${baseUrl}/twitter.webp`], // Must be an absolute URL
  },
  openGraph: {
    title: metaTitle,
    siteName: metaTitle,
    url: baseUrl,
    images: [`${baseUrl}/ogimage.webp`], // Must be an absolute URL
    description: metaDescription,
    type: "website",
  },
};

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const currPool: NftPoolConfigType | undefined =
    POOL_CONFIG[fallbackChainId][1];

  redirect(`/nft-staking/`);
/*
  if (!currPool) {
    return (
      <div>
        <h1>Pool not found</h1>
      </div>
    );
  } else {
    let chartData: Array<any> | null = null;

    if (currPool && currPool?.rewardPair) {
      chartData = await getGeckoChartData(
        "shibarium",
        currPool?.rewardPair,
        dayjs().unix(),
        "day",
        1,
        1000
      );
    }
    return (
      <div>
        <StakingPool NftPoolConfig={currPool} chartData={chartData ?? null} />
      </div>
    );
  }
    */
}
