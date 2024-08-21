/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ScrollShadow } from "@nextui-org/react";
import type { NftPoolConfig, NftPoolConfigType } from "@/constants/types";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import { sortNftAtom, SortType } from "@/config/atoms/sortNftAtom";
import { useAtom } from "jotai";
import { IfNull } from '@/util/logic';
import { nftSort } from "@/util/nft/sort";

const TWEEN_FACTOR_BASE = 0.4;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

interface NftCarouselProps {
  nfts: number[];
  currentPool: NftPoolConfigType | NftPoolConfig | undefined;
  selectable?: boolean;
  targetKey: string;
  sortBy?: "Ascending" | "Descending" | "Rarity" | undefined;
  onSelect?: (nft: string) => void;
}


export function NftCarousel({
  nfts,
  currentPool,
  selectable,
  targetKey,
  sortBy,
  onSelect,
}: NftCarouselProps) {
  console.log(nfts);
  const [sort, setSort] = useAtom(sortNftAtom);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [Autoplay()]
  );
  /* const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__number") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []); */

  useEffect(() => {
    if (sort[targetKey] === "Ascending") {
      console.log("Ascending");
    } else if (sort[targetKey] === "Descending") {
      console.log("Descending");
    }
  }, [sort, targetKey]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {nftSort(nfts, sort[targetKey]).map((nft, i) => (
            <div
              className="embla__slide"
              key={`${(currentPool && currentPool.pid) ?? 1}_${i}_div1`}
            >
              <div className="embla__slide__number text-sm" key={`${(currentPool && currentPool.pid) ?? 1}_${i}_div2`}>{nft}</div>
              <div className="w-full" key={`${(currentPool && currentPool.pid) ?? 1}_${i}_div3`}>
                <img
                  src={`${
                    (currentPool && currentPool.nftUri) ??
                    "https://chewy.build/nft/pixelpalz/pixelpalz/"
                  }${Number(nft).toString()}${
                    (currentPool && currentPool.nftExt) ?? ".png"
                  }`}
                  className="embla__slide__img drop-shadow-md"
                  key={`${(currentPool && currentPool.pid) ?? 1}_${i}_img`}
                  alt={`${IfNull(currentPool && currentPool.nftSymbol, 'NFT')} #${nft}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
