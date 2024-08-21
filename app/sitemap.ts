import { MetadataRoute } from 'next'
import { getPoolNamesByChainId, slugifyString } from '@/util/index';
import { baseUrl, fallbackChainId } from '../constants';

export default function sitemap(): MetadataRoute.Sitemap {

    const poolNames = getPoolNamesByChainId(fallbackChainId);

    const poolItems =
        poolNames.map((name, index) => {
            return {
                url: `${baseUrl}nft-staking/${slugifyString(name)}`,
                lastModified: new Date(),
            }
        })



    return [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}nft-staking`,
            lastModified: new Date(),
        },
        ...poolItems,
    ]
}