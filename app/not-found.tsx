"use client";
import { currentPoolIdAtom } from "@/config/atoms";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { ButtonOverride as Button } from "@/components/Buttons/ButtonOverride";
import Image from "next/image";
import BarImage from "@/components/BarImage";
import {
  ChainId,
  fallbackChainId,
  fallbackChainName,
} from "@/constants/chain-specific";
import {
  getAllChainIdNumbers,
  getChainIdStringByNumber,
  getPoolIdByNftPoolConfig,
  getPoolNamesByChainId,
  matchNftPoolConfigBySlugifiedName,
  slugifyPoolNames,
} from "@/util/index";
import { useAtom } from "jotai";
import { ScrollShadow } from "@nextui-org/react";
import { baseUrl } from "@/constants/project-specific";
import { notFoundSettings } from "@/constants/project-specific/theme/notfound";
// import { RainbowButton } from "@/components/RainbowButton";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-wrap w-full content-center justify-center items-center pt-6">
      <div className="">
        <Card className="max-w-[400px] content-center justify-center drop-shadow-sm hover:drop-shadow-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950">
          <CardHeader className="w-full content-center justify-center text-2xl">
          {notFoundSettings.title}
          </CardHeader>
          <CardBody>
            <div className="flex flex-col flex-wrap justify-center align-middle items-center content-center">
              <div>
                <img
                  src={notFoundSettings.imgUrl}
                  className="w-[300px] h-[300px] mb-4"
                />
              </div>
              {notFoundSettings.description}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
