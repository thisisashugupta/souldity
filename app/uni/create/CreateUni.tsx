"use client"

import { useDeployUniToken } from '@/hooks/useDeployUniToken'
import React, { useState } from 'react'
import InputForm from './InputForm'
import { Heading } from '@/components/ui/heading'

const CreateUni = () => {
  console.log("CreateUni rendered");

    const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);
    const [args, setArgs] = useState<[string, string, string, string]>(['','','','']);

    const { 
      handleSubmit, 
      txnData, 
      isContractLoading, 
      writeSuccess, 
      txnSuccess 
    } = useDeployUniToken({
      isReadyToSubmit, 
      args
    })


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
            className={`
              bg-blue-500 hover:bg-blue-700 disabled:bg-blue-500/50
              ${isReadyToSubmit ? '' : 'cursor-not-allowed'}
              text-white font-bold rounded 
              py-2 px-4 
            `}
            disabled={!isReadyToSubmit}
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>

        <div>{txnSuccess}</div>
        </>
      );
    };
    
export default CreateUni;