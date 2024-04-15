"use client"

import React from 'react'
import CreateUni from './CreateUni'
import { Heading } from '@/components/ui/heading'
import { useAccount } from 'wagmi'

export default function Page() {

  const { chain, isConnected, isDisconnected, isConnecting, isReconnecting } = useAccount();

  if (isDisconnected) return (<Heading>Connect your Wallet to Continue</Heading>);
  if (isConnecting) return (<Heading>Connecting...</Heading>);
  if (isReconnecting) return (<Heading>Trying to Reconnect...</Heading>);

  if (chain?.id !== 11155111) return (<Heading>Connect to Sepolia Testnet</Heading>);

  return (isConnected && <CreateUni />);
};