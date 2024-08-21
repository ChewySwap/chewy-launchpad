'use client'
import { batchSettings, lastPoolIdDefault } from '@/constants/index';
import { atomWithDefault, atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'
import { atomEffect } from 'jotai-effect'
export * from './sortNftAtom';

// create a type for sortNftAtom which includes key pair values of sortTarget and sortValue
// sortTarget is a string and sortValue is a string that can be "Ascending", "Descending" or "Rarity"
// this allows multiple targets with their current sort values to be stored in sortNftAtom



// create an atomWithStorage that stores the sortNftAtom in localstorage, the sortNftAtom
// includes an object with a sort target and a sort value which can be either Ascending, Descending or Rarity

export const userBatchSettings = atomWithStorage('batchSettings', batchSettings)
export const currentPoolIdAtom = atom(1)
export const lastPoolIdAtom = atomWithStorage('lastPoolId', 1)

export const sortAtom = atomWithStorage('nftSort', 'Ascending');

export const symbolAtom = atom('')
export const nameAtom = atom('')
export const totalSupplyAtom = atom(1000000000)
export const decimalsAtom = atom(18)
