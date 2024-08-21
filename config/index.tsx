// import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, createConfig, http } from "wagmi";
// import { authConnector } from "@web3modal/wagmi";
import {
  coinbaseWallet,
  injected,
  metaMask,
  safe,
  walletConnect,
} from "wagmi/connectors";
import { shibarium, shibariumTestnet } from "wagmi/chains";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { metaDescription, projectNameShort, logoExt, metaTitle, pageTitle, baseUrl } from '../constants/project-specific/project';

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: metaTitle,
  description: metaDescription,
  url: baseUrl, // origin must match your domain & subdomain
  icons: [`${baseUrl}/logo.${logoExt}`],
};

// Create wagmiConfig
export const chains = [shibariumTestnet, shibarium] as const;
export const defaultConnectors = [
  walletConnect({ projectId, metadata, showQrModal: false }),
  metaMask({
    dappMetadata: {
      name: projectNameShort,
      url: baseUrl,
    },
  }),
  safe(),
  injected(),
  coinbaseWallet({
    appName: pageTitle,
    appLogoUrl: `${baseUrl}/logo.${logoExt}`,
    version: "3", // Revert back to SDK version 3 to fix mobile device issues
  }),
  // Other connectors...
];

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

// Create wagmiConfig
export const config = createConfig({
  chains: chains,
  transports: {
    [shibariumTestnet.id]: http(),
    [shibarium.id]: http(),
  },
  connectors: defaultConnectors,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeMode: "dark",
  defaultChain: shibariumTestnet,
  enableAnalytics: true,
  enableOnramp: false,
  allowUnsupportedChain: false,
  chainImages: {
    109: "https://chewyswap.dog/images/chains/109.png",
    157: "https://chewyswap.dog/images/chains/109.png",
  },
});

/* export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    auth: {
        email: false, // default to true
        showWallets: true, // default to true
        walletFeatures: false // default to true
    },
})
    */
