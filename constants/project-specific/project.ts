import { BatchSettings, CurrentNftPoolType } from "../types";
import { ChainId } from "../chain-specific";

/**
 * The base URL for the project, can be overridden by the NEXT_PUBLIC_BASE_URL environment variable
**/
export const baseUrl: string =
    process.env.NEXT_PUBLIC_BASE_URL ?? 'https://pad.chewy.build'

export const batchSettings: BatchSettings = {
    maxBatchClaim: 55,
    maxBatchStake: 100,
    maxBatchUnstake: 30,
}

export const lastPoolIdDefault: CurrentNftPoolType = {
    poolId: 1,
    chainId: ChainId.SHIBARIUM
}

export const multiPool = true; // toggles showing multi pool UI

export const projectName = `Chewy Launchpad`
export const projectNameShort = `Chewy Launchpad`
export const pageTitle = `${projectNameShort ? projectNameShort : projectName} Staking` // title that shows in UI

export const imageLogo: boolean = true
export const logoWidth = 100
export const logoHeight = 25
export const logoExt = 'webp'
export const footerExt = 'gif'
export const ogExt = 'webp'

export const metaTitle = `Chewy Launchpad`
export const metaDescription = `Launch projects, stake and farm tokens, stake your NFTs and much more on Chewy Launchpad!`

export const twitter = 'https://twitter.com/ChewySwap'
export const twitterId = '1715725035942330368'
export const twitterAt = "@ChewySwap"
export const telegram = 'https://t.me/ChewySwapCommunity'
export const website = 'https://chewyswap.dog'

export const chartPage = 'https://dexscreener.com/shibarium/0x324eef33af720ce44deab7e32f4367a82b4ea43b'
export const chewyLink = 'https://chewyswap.dog/swap/?outputCurrency=0x2761723006d3Eb0d90B19B75654DbE543dcd974f&chain=shibarium'
export const footerLink = chewyLink

export const toastTheme = "dark" // dark or light

export const projConfig = {
    siteName: metaTitle,
    siteDescription: metaDescription,
    siteUrl: baseUrl,
    githubUrl: 'https://github.com/ChewySwap',
    author: 'Chewy Doggo',
    authorUrl: 'https://chewyswap.dog',
    nav: [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Mint',
            path: '/mint/'
        },
        {
            name: 'Blog (Server)',
            path: '/blog/'
        },
        {
            name: 'GitHub Repo',
            path: 'https://github.com/gregrickaby/nextjs-app-router-examples'
        }
    ]
}