"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Navbar() {
  const { address, connector, isConnected } = useAccount();
  const [displayAddress, setDisplayAddress] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!!address) setDisplayAddress("Deploying as: " + address);
  }, [address]);

  return (
    <div className="flex flex-wrap justify-between border-b border-gray-500 p-10 ">
      <div>
        <Link className="font-bold text-xl" href="/">Soulbound Identity</Link>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
}
