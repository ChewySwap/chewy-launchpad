import {
  BlockchainNftPoolConfig,
  ChainId,
  PoolId,
  NftPoolConfig,
  POOL_CONFIG,
  fallbackChainId,
  fallbackChainName,
  NftPoolConfigType,
} from "../constants";
import { switchChain } from "@wagmi/core";
import { config, projectId } from "../config";
export * from "./arrays";
export * from "./explorerLinks";
export * from "./logic";
export { cn } from "./cn";

export const slugifyString = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export function getPoolSlug(NftPoolConfig: NftPoolConfigType | undefined): string {
  if (!NftPoolConfig) return "error";
  return slugifyString(NftPoolConfig.name);
}

export function getPoolSettings(
  chainId: ChainId = ChainId.SHIBARIUM,
  poolId?: PoolId | number
): NftPoolConfig {
  // If poolId is undefined, determine the first pool ID. This is a placeholder logic.
  // You need to replace it with actual logic to determine the first pool ID based on your data structure.
  const defaultPoolId: PoolId = poolId || (Object.values(PoolId)[0] as PoolId);

  let poolSettings: NftPoolConfig =
    POOL_CONFIG[chainId as ChainId] &&
    (POOL_CONFIG[chainId as ChainId][defaultPoolId] as NftPoolConfig);

  if (!poolSettings) {
    poolSettings = POOL_CONFIG[fallbackChainId][1] as NftPoolConfig;
  }

  return poolSettings as NftPoolConfig;
}

export function getPoolIdByNftPoolConfig(
  NftPoolConfig: NftPoolConfig | NftPoolConfigType | undefined,
  chainId: ChainId = ChainId.SHIBARIUM
): PoolId {
  const pools = POOL_CONFIG[chainId];

  for (const poolId in pools) {
    if (pools[Number(poolId) as keyof typeof pools] === NftPoolConfig) {
      return Number(poolId) as PoolId;
    }
  }

  return 1;
}

export function getPoolIdBySlug(slug: string): number {
  const NftPoolConfig = matchNftPoolConfigBySlugifiedName(slug);
  if (!NftPoolConfig) return 1;
  return getPoolIdByNftPoolConfig(NftPoolConfig);
}

function getPoolIdEnumKey(value: number): any {
  return Object.keys(PoolId).find(
    (key) => PoolId[key as keyof typeof PoolId] === value
  );
}

function getChainIdEnumKey(value: number): any {
  return Object.keys(ChainId).find(
    (key) => ChainId[key as keyof typeof ChainId] === value
  );
}

export function getPoolName(
  chainId: number = ChainId.SHIBARIUM,
  poolIdNumber: number
): string | undefined {
  const poolIdKey = getPoolIdEnumKey(poolIdNumber);
  const chainIdKey = getChainIdEnumKey(chainId);
  const poolSettings = getPoolSettings(chainId as ChainId, poolIdNumber);
  return poolSettings.name;
}

export const getPoolNamesByChainId = (chainId: ChainId) => {
  let pools = POOL_CONFIG[chainId];
  if (!pools) {
    pools = POOL_CONFIG[fallbackChainId];
  }
  return Object.values(pools).map((pool) => pool.name);
};

export const slugifyPoolNames = (poolNames: string[]): string[] => {
  return poolNames.map(
    (name) =>
      name
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, "") // Trim - from end of text
  );
};

export const getSlugByPoolId = (
  poolId: number,
  chainId: number = ChainId.SHIBARIUM
): string | undefined => {
  const poolName = getPoolName(chainId, poolId)
    ?.toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of tex
  return poolName;
};

export function matchNftPoolConfigBySlugifiedName(
  slugifiedPoolName: string,
  chainId: ChainId = ChainId.SHIBARIUM
): NftPoolConfigType | undefined {
  const pools = POOL_CONFIG[chainId];
  if (!pools) return undefined;

  for (const poolId in pools) {
    const pool = pools[Number(poolId) as keyof typeof pools];
    if (!pool) return undefined;
    const slugifiedCurrentPoolName = pool.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

    if (slugifiedCurrentPoolName === slugifiedPoolName) {
      return pool;
    }
  }

  return undefined;
}

export function getAllChainIdNumbers(): number[] {
  const chainIds: number[] = [];
  for (const chainId in ChainId) {
    if (!isNaN(Number(chainId))) {
      chainIds.push(Number(chainId));
    }
  }
  return chainIds;
}

export function getChainIdStringByNumber(chainIdNumber: number): string {
  for (const chainId in ChainId) {
    if (
      typeof ChainId[chainId] === "number" &&
      ChainId[chainId] === chainIdNumber
    ) {
      return chainId.charAt(0).toUpperCase() + chainId.slice(1).toLowerCase();
    }
  }
  return fallbackChainName;
}

async function requestChain() {
  try {
    switchChain(config, { chainId: fallbackChainId });
  } catch (e) {
    console.error(e);
  }
}
