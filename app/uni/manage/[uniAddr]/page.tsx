"use client";

import React from 'react'
import { Heading } from '@/components/ui/heading'
import { useAccount } from 'wagmi'
import ManageUniPage from './UniPage'

export default function Page({ params }: { params: { uniAddr: string } }) {

  const uniAddr = params.uniAddr;

  const { chain, isConnected, isDisconnected, isConnecting, isReconnecting } = useAccount();

  if (isDisconnected) return (<Heading>Connect your Wallet to Continue</Heading>);
  if (isConnecting) return (<Heading>Connecting...</Heading>);
  if (isReconnecting) return (<Heading>Trying to Reconnect...</Heading>);

  if (chain?.id !== 11155111) return (<Heading>Connect to Sepolia Testnet</Heading>);

  // TODO
  // CHECK IF ADDRESS IS VALID ADDRESS
  // IF NOT THEN SHOW A MESSAGE

  return (isConnected && <ManageUniPage uniTokenAddr={uniAddr} />);
};
