import React, { useState } from 'react'
import { abi } from '@/contracts/SBToken/abi'
import { HexString } from '@/types/basic'
import { useFunctionCall } from '@/hooks/useFunctionCall'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import MintTokenInputForm from './MintTokenInputForm'

export default function MintToken({uniTokenAddr, stuUri}: { uniTokenAddr: string, stuUri: string }) {
  
  const [args, setArgs] = useState<[HexString, string, number, string, string, number, number] | null>(null)
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false)

  console.log(args)

  const {
    isReadyToSubmit: isContractWaitReadyToSubmit,
    handleSubmit, 
    txState
  } = useFunctionCall({
    functionName: 'safeMint',
    args: args as any[],
    abi,
    address: uniTokenAddr as HexString
  })

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

        {/* Submit for Minting */}
        <div className='mb-4 text-center'>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleSubmit}
            disabled={!isReadyToSubmit || !isContractWaitReadyToSubmit || txState.loading}
          >
            safeMint
          </Button>
        </div>

    </div>
  )
}