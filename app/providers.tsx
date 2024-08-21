'use client';

import { NextUIProvider } from "@nextui-org/react";
import type { State } from "@wagmi/core";
import Web3Provider from "context";


export function Providers({ children, initialState }: { children: React.ReactNode, initialState?: State }) {
  return (
    <NextUIProvider>
      <Web3Provider initialState={initialState}>{children}</Web3Provider>
    </NextUIProvider>
  );
}
