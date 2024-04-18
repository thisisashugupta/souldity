"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { isAddress } from 'viem'
import { Heading } from '@/components/ui/heading'
import { useAccount } from 'wagmi'
import useSBToken from '@/hooks/useSBToken'
import { HexString } from '@/types/basic'

const ManageUniPage = dynamic(() => import('./UniPage'), 
{ 
  ssr: false, 
  loading: () => <Heading>Loading...</Heading> 
})

export default function Page({ params }: { params: { uniAddr: string } }) {

  const uniAddr = params.uniAddr
  const uni = useSBToken({address: uniAddr as HexString})

  const { 
    address, 
    chain, 
    isConnected, 
    isDisconnected, 
    isConnecting, 
    isReconnecting 
  } = useAccount()

  if (!isAddress(uniAddr)) return (<Heading>{`Invalid Address: ${uniAddr}`}</Heading>)

  console.log('uni', uni)
  if (!uni) return (<Heading>Fetching Uni...</Heading>)

  if (isDisconnected) return (<Heading>Connect your Wallet to Continue</Heading>)
  if (isConnecting) return (<Heading>Connecting...</Heading>)
  if (isReconnecting) return (<Heading>Trying to Reconnect...</Heading>)

  if (chain?.id !== 11155111) return (<Heading>Connect to Sepolia Testnet</Heading>)

  if (address !== uni?.uni_owner) return (<Heading>You are not the Owner of this Uni</Heading>)

  return (isConnected && <ManageUniPage uni={uni} uniTokenAddr={uniAddr} />)
}
