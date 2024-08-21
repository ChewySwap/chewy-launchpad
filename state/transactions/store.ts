
import { createStore } from 'zustand/vanilla'

export type TransactionDetails = {

}

export type TransactionType =
| 'approve'
| 'swap'
| 'wrap'
| 'add-liquidity'
| 'remove-liquidity'
| 'mint-nft'
| 'claim-nft'
| 'stake-nft'
| 'unstake-nft'
| 'claim-nft-rewards'
| 'batch-nft-stake'
| 'batch-nft-unstake'
| 'batch-nft-claim-rewards'
| 'claim-free-nft'
| 'farm-deposit'
| 'farm-withdraw'
| 'claim-farm'
| 'deposit-staking'
| 'withdraw-staking'
| 'claim-staking'
| 'migrate-farm'

export type TransactionState = {
    [chainId: number]: {
        [txHash: string]: TransactionDetails
      }
}

export interface SerializableTransactionReceipt {
  to: string
  from: string
  transactionIndex: number
  contractAddress: string
  blockNumber: number
  blockHash: string
  txHash: string
  status?: number
}

export enum MsgStatus {
  MS_UNKNOWN = 0,
  MS_WAITING_FOR_SGN_CONFIRMATIONS = 1,
  MS_WAITING_FOR_DESTINATION_EXECUTION = 2,
  MS_COMPLETED = 3,
  MS_FAIL = 4,
  MS_FALLBACK = 5,
}


export interface TransactionInfo {
    hash: string
    infoText?: string
    type?: TransactionType
    approve?: { tokenAddress: string; spender: string }
    lastBlockChecked?: number
    timeCreated: number
    timeConfirmed?: number
    from: string
    receipt?: TransactionReceipt
}

export enum FarmTransactionStatus {
  PENDING = -1,
  FAIL = 0,
  SUCCESS = 1,
}

export interface FarmTransactionStep {
  step: number
  chainId: number
  status: FarmTransactionStatus
  tx: string
  isFirstTime?: boolean
  msgStatus?: MsgStatus
}

export enum FarmStepType {
  STAKE = 'STAKE',
  UNSTAKE = 'UNSTAKE',
}


export interface FarmTransactionType {
  type: FarmStepType
  status: FarmTransactionStatus
  amount: string
  lpAddress: string
  lpSymbol: string
  steps: FarmTransactionStep[]
}

export interface TransactionReceipt {
    from: string
    sequenceNumber: string
    blockNumber: string
    success: boolean
    timestamp: string
    transactionHash: string
    status?: number
  }

export type TransactionActions = {
  addTransaction: () => void
  clearTransactions: () => void
}

export type TransactionStore = TransactionState & TransactionActions
