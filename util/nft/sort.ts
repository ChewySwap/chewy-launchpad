

export const nftSort = (nfts: number[], sortedBy: any): number[] => {
    if (sortedBy === "Ascending") {
      return nfts.sort((a, b) => a - b);
    } else if (sortedBy === "Descending") {
      return nfts.sort((a, b) => b - a);
    }
    return nfts;
  }