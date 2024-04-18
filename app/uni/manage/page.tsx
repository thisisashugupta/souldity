"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { useAccount } from 'wagmi'
const ManageUni = dynamic(() => import('./ManageUni'), { ssr: false, loading: () => <Heading>Loading...</Heading> })
import { Heading } from '@/components/ui/heading'

export default function Page() {

  const { chain, isConnected, isDisconnected, isConnecting, isReconnecting } = useAccount();

  if (isDisconnected) return (<Heading>Connect your Wallet to Continue</Heading>);
  if (isConnecting) return (<Heading>Connecting...</Heading>);
  if (isReconnecting) return (<Heading>Trying to Reconnect...</Heading>);

  if (chain?.id !== 11155111) return (<Heading>Connect to Sepolia Testnet</Heading>);

  return (isConnected && <ManageUni />);
};