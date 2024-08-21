import { ChainId, chainSettings } from "@/constants/chain-specific/chains";
import { MASTERCHEFS_CONFIG } from "@/constants/project-specific/farms/masterchef";
import { getAllChainIdNumbers } from "@/util/index";
import { ErrorsObject, GeckoApi, HttpResponse, NetworksTokenPriceDetailData, TokensDetailData } from "@/lib/gecko-api";
import { Ohlcv, OhlcvToken } from '../gecko-api/index';
import dayjs from "dayjs";
import { Address } from "viem";
import { NativeTokenPrices } from "@/constants/project-specific/farms/types";

const api = new GeckoApi();

export async function getNativePrices() {


    const nativeTokenPrices: NativeTokenPrices = {};

    const chains = getAllChainIdNumbers();

    for (const chain of chains) {
        const setting = chainSettings[chain as keyof typeof chainSettings].nativeApiSetting

        const response: HttpResponse<TokensDetailData, ErrorsObject> = await api.networks.tokensDetail(setting.network, setting.address);

        if (response.ok) {
            const attr = response.data?.data?.attributes
            const thePrice = Number(attr?.price_usd)
            // console.log(thePrice);
            nativeTokenPrices[chain] = {
                priceUsd: thePrice,
                totalSupply: Number(attr?.total_supply),
                volumeUsd: Number(attr?.volume_usd?.h24),
                marketCapUsd: Number(attr?.market_cap_usd)
            };
        }
    }


    return nativeTokenPrices;
}

export type TimeFrames = "day" | "hour" | "minute" | undefined;
export async function getGeckoChartData(network: string, poolAddress: string | Address, timestamp: number, timeframe: TimeFrames = "day", aggregate: number = 1, limit: number = 200) {

    const isErroneous = (price: number, reference: number) => {
        return price > reference * 10000000 || price < reference / 10000000;
    };

    try {
        const response: HttpResponse<Ohlcv, ErrorsObject> = await api.networks.poolsOhlcvDetail(network, poolAddress, timeframe, { aggregate: aggregate.toString(), before_timestamp: timestamp.toString(), limit: limit.toString() });
        if (response?.ok && response.data?.data?.attributes?.ohlcv_list) {
            const chartData = response.data?.data?.attributes?.ohlcv_list;

            // Iterate through chartData and correct erroneous prices

            for (let i = 1; i < chartData.length - 1; i++) {
                const [prevTimestamp, prevOpen, prevHigh, prevLow, prevClose, prevVolume] = chartData[i - 1];
                const [currTimestamp, currOpen, currHigh, currLow, currClose, currVolume] = chartData[i];
                const [nextTimestamp, nextOpen, nextHigh, nextLow, nextClose, nextVolume] = chartData[i + 1];

                if (isErroneous(currHigh, prevHigh)) {
                    chartData[i][2] = (prevHigh + nextHigh) / 2; // Correct high
                }
                if (isErroneous(currLow, prevLow)) {
                    chartData[i][3] = (prevLow + nextLow) / 2; // Correct low
                }
                if (isErroneous(currClose, prevClose)) {
                    chartData[i][4] = (prevClose + nextClose) / 2; // Correct close
                }
            }


            // map through chartData and log only the highest and lowest price points
            let highestHigh = -Infinity;
            let lowestLow = Infinity;
            let highestClose = -Infinity;
            let lowestClose = Infinity;

            chartData.forEach(([timestamp, open, high, low, close, volume]) => {
                if (high > highestHigh) highestHigh = high;
                if (low < lowestLow) lowestLow = low;
                if (close > highestClose) highestClose = close;
                if (close < lowestClose) lowestClose = close;
            });

            console.log(`Highest high: ${highestHigh}`);
            console.log(`Lowest low: ${lowestLow}`);
            console.log(`Highest close: ${highestClose}`);
            console.log(`Lowest close: ${lowestClose}`);

            const mappedData = chartData.map(([timestamp, open, high, low, close, volume]) => ({
                open: open,
                high: high,
                low: low,
                close: close,
                time: timestamp,
            }));
            // console.log(mappedData);


            return mappedData.reverse();
        }
    } catch (e) {
        console.error(e);
    }
    return null;
}