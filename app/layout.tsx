import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WatchAccount from "@/components/Wallet/WatchAccount";
import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";
import { customFont, POOL_CONFIG, projConfig } from "@/constants/index";
import Web3Provider from "context";
import { Metadata } from "next";
import { cn, matchNftPoolConfigBySlugifiedName } from "../util";
import { fallbackChainId } from "../constants/chain-specific/chains";
import { Providers } from "./providers";
import { Provider as JotaiProvider } from "jotai";
import { config } from "../config";
import Toast from "@/components/Toast";
import Menu from "@/components/UI/Menu";

export const metadata: Metadata = {
  title: projConfig.siteName,
  description: projConfig.siteDescription,
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  const { slug } = params;
  return (
    <html lang="en" className="dark">
      <body className={cn("antialiased", customFont.className)}>
        <Providers>
          <JotaiProvider>
            <main className={cn("stakeMainDiv", customFont.className)}>
              <Toast />
              <WatchAccount />
              <Menu>{children}</Menu>
            </main>
          </JotaiProvider>
        </Providers>
      </body>
    </html>
  );
}
