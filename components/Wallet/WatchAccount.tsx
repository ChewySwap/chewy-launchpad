"use client";
import { useQueryClient } from "@tanstack/react-query";
import { GetAccountReturnType, watchAccount } from "@wagmi/core";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { config as wagmiConfig } from "@/config/index";
import fetchFarms from "@/lib/farms/fetchFarms";

export default function WatchAccount() {
  const { address, connector } = useAccount();
  const queryClient = useQueryClient();


  useEffect(() => {
    if (connector) {
      const unwatch = watchAccount(wagmiConfig, {
        onChange(
          account: GetAccountReturnType,
          prevAccount: GetAccountReturnType
        ) {
          queryClient.invalidateQueries();
        },
      });
      unwatch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector]);

  return (<></>);
}
