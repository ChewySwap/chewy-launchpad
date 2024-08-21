import { Address } from "viem";
import { BlockscoutApi, GetAddressNftCollectionsData, HttpResponse } from "../blockscout-api";


const api = new BlockscoutApi();

export async function getWalletNfts(address: string | Address) {

    const response: HttpResponse<GetAddressNftCollectionsData> = await api.addresses.getAddressNftCollections(address);

    if (response.ok && response.data.items) {
       //  console.log(response.data.items);
        // console.log(response.data.items[8].token_instances);
        return response.data.items;
    } else {
        return null;
    }

    return null;
}