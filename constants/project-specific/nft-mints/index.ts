import { ChainId } from '@/constants/index';

export type nftMintPageConfig = {
    chainId: ChainId;
    name: string;
    symbol: string;
    totalSupply?: number;
    maxSupply?: number;
    descriptionShort: string;
    descriptionLong: React.ReactNode;
    previewImages?: string[];
    previewGif?: string;
    cost?: number;
}
