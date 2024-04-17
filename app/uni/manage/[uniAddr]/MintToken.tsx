import React, { useState, useEffect } from 'react'
import { abi } from '@/contracts/SBToken/SBToken.abi'
import { HexString } from '@/types/basic'
import { useFunctionCall } from '@/hooks/useFunctionCall'
import { Heading } from '@/components/ui/heading'
import MintTokenInputForm from './MintTokenInputForm'

export default function MintToken({uniTokenAddr, stuUri}: { uniTokenAddr: string, stuUri: string }) {
  
  const [args, setArgs] = useState<[HexString, string, number, string, string, number, number] | null>(null)
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false)
  const [txLoading, setTxLoading] = useState<boolean>(false)
  const [buttonMessage, setButtonMessage] = useState<string>('Create')
  const [txnSuccess, setTxnSuccess] = useState<any>(null)

// TODO: ADD CODE FROM CREATE UNI PAGE

  console.log(args);

  const {
    handleSubmit, 
    isContractWaitLoading, 
    isContractWaitSuccess, 
    txnHash,
    txnWaitData
  } = useFunctionCall({
    functionName: 'safeMint',
    args: args as any[],
    abi,
    address: uniTokenAddr as HexString
  })

  txnWaitData && console.log(txnWaitData);

  return (
    <div className="flex flex-col items-center">

        <Heading>Enter Student Details</Heading>

        <MintTokenInputForm 
          stuUri={stuUri}
          isReadyToSubmit={isReadyToSubmit}
          setIsReadyToSubmit={setIsReadyToSubmit}
          setArgs={setArgs}
          handleSubmit={handleSubmit}
        />

        {txnSuccess && <div>{`Success ?? ${txnSuccess}`}</div>}
    </div>
  )
}