import { baseUrl, ogExt, FarcasterImageConfig, FarcasterButtonConfig, telegram } from ".";


export const farImage: FarcasterImageConfig = {
    url: `${baseUrl}/ogimage${ogExt}`,
    ratio: '1.91:1'
} as const

export const farButton1: FarcasterButtonConfig = {
    action: 'link',
    label: 'NFT Staking',
    target: baseUrl
} as const

export const farButton2: FarcasterButtonConfig = {
    action: 'link',
    label: 'Telegram',
    target: telegram
} as const
