"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Navbar() {

  return (
    <div className="z-10 fixed w-full flex justify-between items-center border-b border-gray-500 backdrop-blur p-4">
      <Link className="font-semibold text-xl" href="/">Souldity</Link>
      <ConnectButton />
    </div>
  );
}
