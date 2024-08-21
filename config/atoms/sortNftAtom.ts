import { atom, useSetAtom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Define possible sort types
export type SortType = 'Ascending' | 'Descending' | 'Rarity';

// Define the structure of the sort configuration
export interface SortConfig {
    [target: string]: SortType;
}



// Define the initial state for the sort configuration
const initialSortConfig: SortConfig = {};

// Create an atom with storage to store the sort configuration in local storage
export const sortNftAtom = atomWithStorage<SortConfig>('sortNftConfig', initialSortConfig);
