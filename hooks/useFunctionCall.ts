"use client"

import React, { useState, useCallback } from 'react'
import { HexString } from '@/types/basic'
import { 
    useAccount, 
    useSimulateContract, 
    useWriteContract, 
    useWaitForTransactionReceipt 
} from 'wagmi'

type UseFunctionCallProps = {
  functionName: string,
  args: any[],
  abi: any,
  address: HexString
}

export function useFunctionCall({functionName, args, abi, address}: UseFunctionCallProps) {

    const { chain } = useAccount();
    const [txnHash, setTxnHash] = useState<string | null>(null);

    const { data } = useSimulateContract({
      address,
      abi,
      functionName,
      chainId: chain?.id,
      args
    });
    console.log('useSimulateContract data:', data);
    
    const { writeContract } = useWriteContract()

    const {
      data: txnWaitData,
      isLoading: isContractWaitLoading,
      isSuccess: isContractWaitSuccess,
    } = useWaitForTransactionReceipt({
      hash: txnHash as HexString, 
      confirmations: 1
    })

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            try {
                writeContract(data!.request, { 
                  onSuccess: (txHash) => setTxnHash(txHash), 
                  onError: (error) => console.log('Error in submitting tx:', error)
                })
            } catch (error) {
                console.error(error);
                console.log('There was an error while writing txn');
            }
        }, 
        [writeContract, data]
    )
    
    
    return { 
      handleSubmit, 
      isContractWaitLoading, 
      isContractWaitSuccess, 
      txnHash,
      txnWaitData
    };
    
};