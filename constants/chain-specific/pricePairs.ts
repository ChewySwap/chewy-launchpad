import { Address } from "viem";
import { BlockchainTokens } from "../types";
import { ChainId } from "./chains";


export const wethUsdPair: BlockchainTokens = {
    [ChainId.SHIBARIUM]: '0xB69A4132af7495aE809Ce0155b7be1889ef72918'
}

export const usdContract: BlockchainTokens = {
    [ChainId.SHIBARIUM]: '0xaB082b8ad96c7f47ED70ED971Ce2116469954cFB'
}

export const wethContract: BlockchainTokens = {
    [ChainId.SHIBARIUM]: '0xC76F4c819D820369Fb2d7C1531aB3Bb18e6fE8d8'
}