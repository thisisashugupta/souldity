"use client"

import React, { useState, useCallback } from 'react'
import { HexString } from '@/types/basic'
import SBTokenFactory from '@/contracts/SBTokenFactory/SBTokenFactory'
import { 
    useAccount, 
    useSimulateContract, 
    useWriteContract, 
    useWaitForTransactionReceipt 
} from 'wagmi'

const factoryABI = SBTokenFactory.abi;
const factoryContract = SBTokenFactory.networks[11155111].address as HexString;

type UseDeployUniTokenProps = {
    args: [string, string, string, string]
}

export function useDeployUniToken({args}: UseDeployUniTokenProps) {

    const { chain } = useAccount();
    const [txnHash, setTxnHash] = useState<string | null>(null);

    const { data } = useSimulateContract({
      address: factoryContract,
      abi: factoryABI,
      functionName: 'createSBToken',
      chainId: chain?.id,
      args
    });
    
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