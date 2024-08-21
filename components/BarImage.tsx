import { POOL_CONFIG, PoolId } from "@/constants/project-specific/pools";
import { URL } from "url";
import { ChainId, fallbackChainId } from "../constants";

const imgWidth = "65px";

interface BarImageProps {
    url: any
    pool: PoolId
    chain?: ChainId
}

export default function BarImage({ url, pool, chain }: BarImageProps) {
    const chainId = chain ?? fallbackChainId
    let imgFolder = POOL_CONFIG[chainId][pool]?.imgFolder ?? String(pool);

    return (
        <img src={`../images/pools/${Number(chainId)}/${String(imgFolder)}/${String(url)}`} width={imgWidth} height={imgWidth} className="mr-5 md:mr-0 text-left transition-all object-contain hover:scale-110 hover:-rotate-3 active:scale-100" />
    )
}

export const barImgUrl = (url: string, pool: PoolId, chain?: ChainId) => {
    const chainId = chain ?? fallbackChainId
    let imgFolder = POOL_CONFIG[chainId][pool]?.imgFolder ?? String(pool);

    return`/images/pools/${Number(chainId)}/${String(imgFolder)}/${String(url)}`
}