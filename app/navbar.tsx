"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Navbar() {
  const { address, connector, isConnected } = useAccount();
  const [displayAddress, setDisplayAddress] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!!address) setDisplayAddress("Deploying as: " + address);
  }, [address]);

  return (
    <div>
      <div><a href="/">Soulbound Identity</a></div>
      <div><ConnectButton /></div>
    </div>
  );
}