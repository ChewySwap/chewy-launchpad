import { readContracts } from '@wagmi/core'
import { Address, ContractFunctionParameters, formatUnits } from 'viem'
import { getTokenContract } from '../../util/contracts/tokenContract'
import { ChainId, wethAddresses } from '@/constants/chain-specific/chains'
import { config as wagmiConfig } from '@/config/index'
import { tokenAbi } from '@/constants/abi/tokenAbi'
import { FarmConfig } from '@/constants/project-specific/farms/types'

// get token prices using wagmi core actions

export async function getTokenPrice(
    chainId: ChainId,
    priceTokenAddress: Address,
    priceTokenPair: Address,
    priceTokenDecimals: number = 18,
    usdTokenAddress: Address,
    usdTokenPair: Address,
    usdTokenDecimals: number = 6,
    wethAddress: Address = wethAddresses[chainId]
) {
    const result = await readContracts(wagmiConfig, {
        allowFailure: false,
        contracts: [
            {
                address: priceTokenAddress,
                abi: tokenAbi,
                functionName: 'balanceOf',
                args: [priceTokenPair],
                chainId: chainId
            },
            {
                address: wethAddress,
                abi: tokenAbi,
                functionName: 'balanceOf',
                args: [priceTokenPair],
                chainId: chainId
            },
            {
                address: usdTokenAddress,
                abi: tokenAbi,
                functionName: 'balanceOf',
                args: [usdTokenPair],
                chainId: chainId
            },
            {
                address: wethAddress,
                abi: tokenAbi,
                functionName: 'balanceOf',
                args: [usdTokenPair],
                chainId: chainId
            }
        ]
    })

    const [ptBalance, wethBalance, usdBalance, wethUsdBalance] = result

    const usdPerWeth: number =
        Number(formatUnits(wethUsdBalance, usdTokenDecimals)) /
        Number(formatUnits(wethUsdBalance, 18))
    const wethPerReward: number =
        Number(formatUnits(wethBalance, 18)) /
        Number(formatUnits(ptBalance, priceTokenDecimals))
    const tokenPriceUsd: number = usdPerWeth * wethPerReward

    return tokenPriceUsd
}

export async function getFarmTokenPrice(farm: FarmConfig, chainId: ChainId) {

    return getTokenPrice(
        chainId,
        farm.tokenA.address,
        farm.lpAddress,
        farm.tokenA.decimals,
        farm.dex.usdToken.address,
        farm.dex.wethUsdPair,
        farm.dex.usdToken.decimals,
        wethAddresses[chainId]
    )
}

export async function getFarmTokenPrices(farm: FarmConfig, chainId: ChainId) {

    const tokenAprice = await getTokenPrice(
        chainId,
        farm.tokenA.address,
        farm.lpAddress,
        farm.tokenA.decimals,
        farm.dex.usdToken.address,
        farm.dex.wethUsdPair,
        farm.dex.usdToken.decimals,
        wethAddresses[chainId]
    )

    const tokenBprice = await getTokenPrice(
        chainId,
        farm.tokenA.address,
        farm.lpAddress,
        farm.tokenA.decimals,
        farm.dex.usdToken.address,
        farm.dex.wethUsdPair,
        farm.dex.usdToken.decimals,
        wethAddresses[chainId]
    )
}

export async function getTokenPriceApi() {

}