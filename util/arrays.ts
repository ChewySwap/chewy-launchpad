import * as R from 'ramda';

/**
 * Removes all occurrences of a specified value from an array.
 *
 * @param arr - The array from which to remove the value.
 * @param value - The value to be removed from the array.
 * @returns The modified array with all occurrences of the value removed.
 */
export function removeItemAll(arr: any[], value: any) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

/**
 * Splits an array into smaller arrays of a specified size.
 *
 * @param array - The array to be split.
 * @param size - The size of each chunked array.
 * @returns An array of smaller arrays, each containing elements of the original array.
 */
export function chunkArray(array: any[], size: number): any[] {
    const chunkedArray: any[] = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
}

// sort an array of numbers by ascending order using ramda library

// sory an array of numbers by descending order using ramda library

export const sortNumbersAsc = R.sortBy(R.identity);

export const sortNumbersDesc = R.curry((numbers: number[]) => R.sort(R.descend(R.identity), numbers));