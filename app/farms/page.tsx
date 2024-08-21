import FarmCard from "./blocks/FarmCard";
import { ChainFarmData, FarmConfig } from "@/constants/project-specific/farms/types";
import { FARMS_CONFIG } from "@/constants/project-specific/farms/pools";
import { ChainId, chainSettings, fallbackChainId } from "@/constants/chain-specific";
import Content from "@/components/Layout/Flex/Content";
import NotFound from "app/not-found";
import FarmOverview from "./blocks/FarmOverview";
import { getFarmRewardPrices } from "@/lib/price-data/farmPrices";
import { FARM_PAGE_CONFIG } from "@/constants/project-specific/farms";
import { getGeckoChartData, getNativePrices } from "@/lib/price-data/geckoPrices";
import { getWalletNfts } from "@/lib/wallet-data/getWalletNfts";
import CandleChart from "@/components/Charts/Candlestick";
import dayjs from "dayjs";
import fetchFarms from "@/lib/farms/fetchFarms";

export const revalidate = 300 // revalidate at most every hour
export default async function Page() {
  const nfts = getWalletNfts('0x371f1c6B17E845C805FC49769cB42f65a998BAA0');
  const farmConfig = FARMS_CONFIG[ChainId.SHIBARIUM][0];
  const farmPageConfig = FARM_PAGE_CONFIG
  const prices = await getFarmRewardPrices();
  const nativePrices = await getNativePrices();
  const farmData: ChainFarmData = await fetchFarms(prices, nativePrices);
  const chartData = await getGeckoChartData("shibarium", farmConfig.lpAddress, dayjs().unix(), "day", 1, 1000);
  const defaultTokenPrice = prices[FARM_PAGE_CONFIG.defaultChain].find((price) => price.rewardContract === FARM_PAGE_CONFIG.defaultChef.rewardToken.address.toLowerCase());

  // console.log(prices);
  // console.log(nativePrices);

  return (
    <Content className="px-4">
      <FarmOverview farms={farmData} />
      <CandleChart data={chartData} />
      <div className="flex place-self-center place-content-center w-1/2 mt-10">
      {FARM_PAGE_CONFIG.defaultChef.rewardToken.symbol} Price: ${Number(defaultTokenPrice?.rewardPrice).toFixed(FARM_PAGE_CONFIG.defaultChef.rewardToken.priceDecimals || 5)}
      </div>
      <div className="flex place-self-center place-content-center w-1/2 mt-5">
      {chainSettings[FARM_PAGE_CONFIG.defaultChain].nativeCurrency.symbol} Price: ${Number(nativePrices[FARM_PAGE_CONFIG.defaultChain].priceUsd).toFixed(4)}
      </div>
    </Content>
  );
}
