import { ChainId, chainSettings} from "../constants";


export const explorerUrl = (chainId: ChainId): string => {
  return chainSettings[chainId].blockExplorerUrl;
}
export function txLink (txHash: string, chainId: ChainId): string {
  return `${explorerUrl(chainId)}/tx/${txHash}`;
}
