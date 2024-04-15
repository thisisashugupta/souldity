"use client"

import React, { useEffect, useState } from 'react'
import { useDeployUniToken } from '@/hooks/useDeployUniToken'
import InputForm from './InputForm'
import ListenTokenCreationEvents from './ListenTokenCreationEvents'
import { Heading } from '@/components/ui/heading'
import toast from 'react-hot-toast'

const CreateUni = () => {

    ListenTokenCreationEvents();

    const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);
    const [args, setArgs] = useState<[string, string, string, string]>(['','','','']);
    const [txLoading, setTxLoading] = useState<boolean>(false);
    const [buttonMessage, setButtonMessage] = useState<string>('Create');

    const {
      handleSubmit, 
      isContractWaitLoading, 
      isContractWaitSuccess, 
      txnHash,
      txnWaitData
    } = useDeployUniToken({ args })

    txnWaitData && console.log(txnWaitData);


    useEffect(() => {
      if (isContractWaitSuccess){
        setButtonMessage('Create');
        setArgs(['','','','']);
        toast.success('Transaction confirmed');
        txLoading && setTxLoading(false);
      } 
      else if (isContractWaitLoading) {
        setButtonMessage('Waiting...');
        toast('Waiting for Tx Confirmation');
        !txLoading && setTxLoading(true);
      } 
    }, [isContractWaitLoading, isContractWaitSuccess]);

    useEffect(() => {
      if (txnHash) {
        toast.success(`Transaction submited`)
        console.log(`Transaction submitted at ${txnHash}`)
        !txLoading && setTxLoading(true);
      }
    }, [txnHash]);


    return (
      <>
        <Heading>CreateUni</Heading>
          
        <InputForm 
          isReadyToSubmit={isReadyToSubmit} 
          setIsReadyToSubmit={setIsReadyToSubmit}
          setArgs={setArgs}
        />

        {/* Submit for Deployment */}
        <div className='flex justify-center'>
          <button
            className={`bg-blue-500 hover:bg-blue-700 disabled:bg-blue-500/50
              ${isReadyToSubmit ? '' : 'cursor-not-allowed'}
              text-white font-bold rounded py-2 px-4 `}
            disabled={!isReadyToSubmit || txLoading}
            onClick={handleSubmit}
          >
            {buttonMessage}
          </button>
        </div>
        </>
      );
    };
    
export default CreateUni;