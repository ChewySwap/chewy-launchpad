"use client";

import React, { ReactNode } from "react";
import { Provider as JotaiProvider } from "jotai";
import { config, projectId } from "../config";

import { shibarium, base } from "wagmi/chains";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { State, WagmiProvider } from "wagmi";
import { OnchainKitProvider } from "@coinbase/onchainkit";

import { hashFn } from "@wagmi/core/query";

// Setup queryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: hashFn,
    },
  },
});

if (!projectId) throw new Error("Project ID is not defined");

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export default function Web3Provider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <JotaiProvider>
      <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          {/* @ts-ignore-error */}
          <OnchainKitProvider
            apiKey={process.env.PUBLIC_ONCHAINKIT_API_KEY}
            chain={base}
          >
            {children}
          </OnchainKitProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </WagmiProvider>
    </JotaiProvider>
  );
}
