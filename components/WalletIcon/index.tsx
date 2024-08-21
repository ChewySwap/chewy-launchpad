// @ts-nocheck
'use client'
import Opera from "./Icons/Opera"
import Metamask from "./Icons/Metamask"
import Rabby from "./Icons/Rabby"
import SafePal from "./Icons/SafePal"
import Brave from "./Icons/Brave"
import MathWallet from "./Icons/MathWallet"
import TrustWallet from "./Icons/TrustWallet"
import TokenPocket from "./Icons/TokenPocket"
import Coin98 from "./Icons/Coin98"
import WalletConnect from "./Icons/WalletConnect"
import Image from 'next/image'
import 'viem/window';
import { useWalletInfo } from '@web3modal/wagmi/react'


export default function WalletIcon(props: any) {
    const { walletInfo } = useWalletInfo()

    if (walletInfo && walletInfo.icon) {
        return <Image src={walletInfo.icon} alt={walletInfo.name} {...props} />
    }
    if (typeof window !== 'undefined') {
        if (Boolean(window.ethereum?.isOpera)) {
            return <Opera {...props} />
        } else if (Boolean(window.ethereum?.isRabby)) {
            return <Rabby {...props} />
        } else if (Boolean(window.ethereum?.isSafePal)) {
            return <SafePal {...props} />
        } else if (Boolean(window.ethereum?.isBraveWallet)) {
            return <Brave {...props} />
        } else if (Boolean(window.ethereum?.isMathWallet)) {
            return <MathWallet {...props} />
        } else if (Boolean(window.ethereum?.isTrust) ||
        // @ts-ignore
        Boolean(window.ethereum?.isTrustWallet)) {
            return <TrustWallet {...props} />
        } else if (Boolean(window.ethereum?.isTokenPocket)) {
            return <TokenPocket {...props} />
        } else if (Boolean(window.ethereum?.isCoin98) || Boolean((window as any).coin98) ) {
            return <Coin98 {...props} />
        } else if (Boolean(window.ethereum?.isMetaMask)) {
            return <Metamask {...props} />
        } else {
            return <WalletConnect {...props} />
        }
    }

    return <Metamask {...props} />
}