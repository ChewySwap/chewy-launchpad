import { BlockchainNftPoolConfig, NftPoolConfigType } from '@/constants/types';
import { POOL_CONFIG } from '../constants/project-specific/pools';
import { toast } from "react-toastify";
import { watchAsset } from '@wagmi/core'
import { config } from "@/config/index"
import "viem/window";

export async function watchNft(tokenId: number, currPool: NftPoolConfigType) {
    try {
        console.log(`"method": "wallet_watchAsset",
        "params": {
          "type": "ERC721",
          "options": {
            "address": ${currPool.nftAddress},
            "symbol": ${currPool.nftSymbol},
            "decimals": ${currPool.rewardDecimals.toString()},
            "image": ${currPool.nftUri + tokenId.toString() + currPool.nftExt},
            "tokenId": ${tokenId.toString()},
          }
        }`);
        await window.ethereum?.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC721",
                options: {
                    address: String(currPool.nftAddress),
                    symbol: currPool.nftSymbol,
                    decimals: currPool.rewardDecimals.toString(),
                    image: currPool.nftUri + tokenId.toString() + currPool.nftExt,
                    tokenId: tokenId.toString(),
                },
            },
        });
    } catch (err) {
        toast("Error or user canceled", { type: "error" });
    }
}

export async function watchReward(currPool: NftPoolConfigType) {
    try {
        if (currPool.rewardSymbol === "WSKULLZ") {
            await watchAsset(config,
                {
                    type: "ERC20",
                    options: {
                        address: "0x5212B42ef96A47Af93F3a6c801227b650EDEb12f",
                        symbol: "SKULLZ",
                        decimals: 18,
                        image:
                            "https://github.com/ChewySwap/chewy-tokenlist/blob/main/tokens/skullz.gif?raw=true",
                    },
                });
        } else {
            await watchAsset(config,
                {
                    type: "ERC20",
                    options: {
                        address: currPool.rewardAddress,
                        symbol: currPool.rewardSymbol,
                        decimals: currPool.rewardDecimals,
                        image: currPool.rewardLogo,
                    },
                });
        }
        toast(`${currPool.rewardSymbol} token successfully imported to wallet`, { type: "success" });
    } catch (err) {
        toast("Error or user canceled", { type: "error" });
    }
}