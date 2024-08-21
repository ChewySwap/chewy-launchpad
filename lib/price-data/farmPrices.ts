
import { ChainId, chainSettings } from "@/constants/chain-specific/chains";
import { MASTERCHEFS_CONFIG } from "@/constants/project-specific/farms/masterchef";
import { FarmRewardData, FarmRewardPrices } from "@/constants/project-specific/farms/types";
import { getAllChainIdNumbers } from "@/util/index";



export async function getFarmRewardPrices() {

    const farmRewardPrices: FarmRewardPrices = {};

    const chains = getAllChainIdNumbers();

    for (const chain of chains) {
        const farmRewardData: FarmRewardData[] = [];
        const masterChefs = MASTERCHEFS_CONFIG[chain as keyof typeof MASTERCHEFS_CONFIG];
        // Loop through each MasterChef contract in config

        let contracts = [];
        let symbols = [];
        for (const chef of masterChefs) {
            contracts.push(chef.rewardToken.address);
            symbols.push(chef.rewardToken.symbol);
        }
        const contractList = contracts.join(',');
        // Get reward token prices for each MasterChef contract
        const base = chainSettings[chain as keyof typeof chainSettings].tokenPriceEndpoints?.geckoterminal
        const endpoint = new URL(contractList, base);
        if (endpoint) {
            const rewardPrices = await fetch(endpoint);
            if (rewardPrices.ok) {
                const rewardData = await rewardPrices.json();
                // loop through contracts and set price
                // console.log(rewardData.data.attributes.token_prices);
                for (let i = 0; i < contracts.length; i++) {
                    farmRewardData.push({
                        rewardContract: contracts[i].toLowerCase(),
                        rewardPrice: Number(rewardData.data.attributes.token_prices[contracts[i].toLowerCase()])
                    });
                }

            }
        }


        farmRewardPrices[chain] = farmRewardData;
    }


    return farmRewardPrices;
}