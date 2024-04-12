"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { HexString } from '@/types/basic'
import SBTokenFactory from '@/contracts/SBTokenFactory/SBTokenFactory'
import { 
    useNetwork, 
    usePrepareContractWrite, 
    useContractWrite, 
    useWaitForTransaction 
} from 'wagmi'

const factoryABI = SBTokenFactory.abi;
const factoryContract = SBTokenFactory.networks[11155111].address as HexString;

type UseDeployUniTokenProps = {
    isReadyToSubmit: boolean, 
    args: [string, string, string, string]
}

export function useDeployUniToken({isReadyToSubmit, args}: UseDeployUniTokenProps) {
    console.log("useDeployUniToken rendered");

    const { chain } = useNetwork();
    const [txnSuccess, setTxnSuccess] = useState<string | null>(null);

    const { 
      config, 
      error: prepareError, 
      isError: isPrepareError 
    } = usePrepareContractWrite({
      address: factoryContract,
      abi: factoryABI,
      enabled: isReadyToSubmit,
      functionName: 'createSBToken',
      chainId: chain?.id,
      args
    });

    // console.log({
    //     usePrepareContractWrite: 'usePrepareContractWrite',
    //     config: config,
    //     prepareError: prepareError,
    //     isPrepareError: isPrepareError
    // });

    if (isPrepareError) {
        console.warn(`error in usePrepareContractWrite`);
        console.error(prepareError);
    };
    

    const { 
      data, 
      isLoading, 
      isError, 
      error, 
      write, 
      isSuccess, 
      status 
    } = useContractWrite(config);

    // console.log({
    //   contractWrite: 'contractWrite',
    //   data: data,
    //   isLoading: isLoading,
    //   isError: isError,
    //   error: error, 
    //   write: write,
    //   isSuccess: isSuccess,
    //   status: status    
    // });

    if (isError) {
        console.warn("error in useContractWrite");
        console.error(error);
    };



    const {
      data: txnData,
      isLoading: isContractLoading,
      isSuccess: writeSuccess,
    } = useWaitForTransaction({
      hash: data?.hash,
    })

    // console.log({
    //   waitForTransaction: 'WaitForTransaction',
    //   data: txnData,
    //   isLoading: isContractLoading,
    //   isSuccess: writeSuccess,
    // });
    
    console.log(`Transaction: ${JSON.stringify(txnData)}`);


    useEffect(() => {
      if (writeSuccess) {
        console.log(`Returned Data on write success`, txnData)
        setTxnSuccess(`Success, Transaction submited successfully`);
        console.log({
          title: 'Success',
          description: 'Transaction submited successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    }, [writeSuccess, txnData]);


    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            try {
                await write?.()
            } catch (error) {
                console.error(error);
                console.log({
                    title: 'Error',
                    description: 'There was an error while writing txn',
                    status: 'error',
                });
            }
        }, 
        [write]
    )
    
    
    return { handleSubmit, txnData, isContractLoading, writeSuccess, txnSuccess };
    
};