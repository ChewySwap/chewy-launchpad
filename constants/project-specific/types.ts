import type {SVGProps} from "react";
import { Address } from "viem";

export type FarcasterButtonConfig = {
    action: "link" | "mint" | "post" | "post_redirect" | "tx" | undefined
    label: string
    target: string
}

export type FarcasterImageConfig = {
    url: string
    ratio: "1.91:1" | "1:1" | undefined
}


export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
