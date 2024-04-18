"use client"

import React, { 
  useState, 
  useEffect, 
  useCallback 
} from 'react'
import { HexString } from '@/types/basic'
import { 
    useAccount, 
    useSimulateContract, 
    useWriteContract, 
    useWaitForTransactionReceipt 
} from 'wagmi'
import { toast } from 'react-hot-toast'

type UseFunctionCallProps = {
  functionName: string,
  args: any[],
  abi: any,
  address: HexString
}

type TxState = {
  loading: boolean,
  submitted: boolean
  success: boolean,
  hash?: string,
  waiting: boolean,
  confirmed: boolean,
  error: any
}

const initialTxState: TxState = {
  loading: false,
  submitted: false,
  success: false,
  waiting: false,
  confirmed: false,
  error: null
}

export function useFunctionCall({
  functionName, 
  args, 
  abi, 
  address
}: UseFunctionCallProps) {

    const { chain } = useAccount()

    const [txState, setTxState] = useState<TxState>(initialTxState)
    console.log(txState)

    const { data } = useSimulateContract({
      address,
      abi,
      functionName,
      chainId: chain?.id,
      args
    })
    
    const { writeContract } = useWriteContract()

    const {
      data: txnWaitData,
      isLoading: isContractWaitLoading,
      isSuccess: isContractWaitSuccess,
    } = useWaitForTransactionReceipt({
      hash: txState.hash as HexString || undefined, 
      confirmations: 1
    })
    console.log({
      txnWaitData, 
      isContractWaitLoading, 
      isContractWaitSuccess
    })

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            setTxState({ loading: true, submitted: false, success: false, waiting: false, confirmed: false, error: null })
            try {
                writeContract(data!.request, { 
                  onSuccess: (txHash) => {
                    setTxState((prev) => ({ 
                      ...prev, 
                      submitted: true, 
                      hash: txHash 
                    }))
                    toast.success(`Transaction Submited`)
                    console.log(`Transaction Submitted: ${txHash}`)
                  }, 
                  onError: (error) => {
                    setTxState((prev) => ({ 
                      ...prev, 
                      loading: false, 
                      submitted: false, 
                      error
                    }))
                    toast.error(`Error in Submitting Transaction`)
                    console.error(`Error in Submitting Transaction: ${error}`)
                  }
                })
            } catch (error) {
                console.error(error)
                setTxState((prev) => ({ ...prev, loading: false, error }))
                console.log('There was an error while Writing Txn')
            }
        }, 
        [writeContract, data]
    )

    useEffect(() => {
      if (isContractWaitSuccess) {
        // setArgs(null)
        toast.success('Transaction Confirmed')
        setTxState((prev) => ({ 
          ...prev, 
          loading: false, 
          waiting: false, 
          confirmed: true, 
          success: true 
        }))
      } 
    }, [isContractWaitSuccess])

    useEffect(() => {
      if (isContractWaitLoading) {
        toast('Waiting for Tx Confirmation')
        setTxState((prev) => ({ ...prev, waiting: true }))
      } 
    }, [isContractWaitLoading])

    return { 
      isReadyToSubmit: Boolean(data), 
      handleSubmit, 
      isContractWaitLoading, 
      isContractWaitSuccess, 
      txState, 
      txnWaitData
    }
    
}