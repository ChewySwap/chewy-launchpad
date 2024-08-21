// app/products/[categorySlug]/[productId]/page.js

import { currentPoolIdAtom } from "@/config/atoms";
import type { Metadata, ResolvingMetadata } from "next";
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
import StakingPool from "../StakingPool";
import {
  baseUrl,
  chartPage,
  chewyLink,
  metaDescription,
  metaTitle,
  pageTitle,
  twitterAt,
  twitterId,
} from "@/constants/project-specific";
import NotFound from "app/not-found";
import PoolPreview from "../PoolPreview";
import { getGeckoChartData } from "@/lib/price-data/geckoPrices";
import dayjs from "dayjs";

// Generate segments for both [...slug].tsx and [...slug]/page.tsx
export async function generateStaticParams() {
  const chains: string[] = getAllChainIdNumbers().map((chainId) =>
    getChainIdStringByNumber(chainId)
  ) ??
    getChainIdStringByNumber(fallbackChainId) ?? [fallbackChainName];
  const allPoolSlugs: string[] = chains
    .map((chain) =>
      slugifyPoolNames(
        getPoolNamesByChainId(ChainId[chain as keyof typeof ChainId])
      )
    )
    .flat();

  console.log(
    allPoolSlugs.map((slugName) => ({
      slug: slugName,
    }))
  );

  return allPoolSlugs.map((slugName) => ({
    slug: slugName,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = params;

  const currPool: NftPoolConfigType | undefined =
    matchNftPoolConfigBySlugifiedName(slug);

  return {
    title: `${metaTitle}${currPool && ` - ${currPool.name}`}`,
    description: currPool?.aboutContent1,
    bookmarks: [baseUrl, chartPage, chewyLink],
    category: "staking",
    twitter: {
      card: "summary_large_image",
      title: `${metaTitle}${currPool && ` - ${currPool.name}`}`,
      description: currPool?.aboutContent1,
      siteId: twitterId,
      creator: twitterAt,
      creatorId: twitterId,
      images: [`${baseUrl}/ogimage.png`], // Must be an absolute URL
    },
    openGraph: {
      title: `${metaTitle}${currPool && ` - ${currPool.name}`}`,
      siteName: metaTitle,
      url: `${baseUrl}/nft-staking/${slug}`,
      images: [`${baseUrl}/ogimage.png`], // Must be an absolute URL
      description: metaDescription,
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const currPool: NftPoolConfigType | undefined =
    matchNftPoolConfigBySlugifiedName(slug);

  if (!currPool) {
    return (
      <div>
        <PoolPreview />
      </div>
    );
  }

  const chartData = await getGeckoChartData(
    "shibarium",
    currPool.rewardPair,
    dayjs().unix(),
    "hour",
    1,
    500
  );

  return (
    <div>
      <StakingPool NftPoolConfig={currPool} chartData={chartData} />
    </div>
  );
}
