"use client"

import React, { useState, useEffect } from 'react'
import SBTokenFactory from '@/contracts/SBTokenFactory/SBTokenFactory'
import { useReadContract } from 'wagmi'
import { redirect } from 'next/navigation'
import { HexString } from '@/types/basic'
import { Heading } from '@/components/ui/heading'

const factoryABI = SBTokenFactory.abi;
const factoryContract = '0x2DDE1632f75258329877c29398Ba29331d6a42C4' as HexString;
// SBTokenFactory.networks[11155111].address as HexString;
// 0x2DDE1632f75258329877c29398Ba29331d6a42C4

const ManageUni = () => {

    const [uniId, setUniId] = useState<number>(0);
    const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);
    // const [uniTokenAddr, setUniTokenAddr] = useState<string>("some-uni-token-address");


    const { data: uniTokenAddress, isError, isLoading } = useReadContract({
        address: factoryContract,
        abi: factoryABI,
        functionName: 'uniIdToAddress',
        args: [uniId],
    });

    console.log({
        uniTokenAddress: uniTokenAddress,
        isError: isError,
        isLoading: isLoading
    });
    
    useEffect(() => {
        if(!isReadyToSubmit) return;
        // redirect to /uni/manage/uniTokenAddress
        // setUniTokenAddr(uniTokenAddress);
        redirect(`/uni/manage/${uniTokenAddress}`);
    }, [isReadyToSubmit, uniTokenAddress]);

    function handleSubmit (e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsReadyToSubmit(true);
    }

    return (
        <>
            <Heading>ManageUni</Heading>
            <div className='flex flex-col items-center justify-center p-4'>
                <div className='text-lg block text-gray-700 font-bold md:text-right mb-1 md:mb-3 pr-4'>
                    Please go to CreateUni to create a new SBT Token
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex justify-between p-2'>
                        <label className='text-xl' htmlFor="uni-id">University Id</label>
                        <input className='border border-gray-300 p-2 rounded-md' type="text" name="uni-id" onChange={(e) => setUniId(Number(e.target.value))}/>
                    </div>
                    <div className='flex justify-center p-2'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ManageUni;