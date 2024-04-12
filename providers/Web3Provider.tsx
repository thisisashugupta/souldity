'use client';

import React, { useState, useEffect, ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora, sepolia],
    [
        // alchemyProvider({ apiKey: process.env.ALCHEMY_ID! }),
        publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Souldity',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT!,
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

  export default function Web3Provider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          {mounted && children}
        </RainbowKitProvider>
      </WagmiConfig>
    );
  }