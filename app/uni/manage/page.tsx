"use client"

import React, { useState, useEffect } from 'react'
import SBTokenFactory from '@/contracts/SBTokenFactory'
import { useContractRead } from 'wagmi'
import { redirect } from 'next/navigation'
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
type HexString = `0x${string}`;

const factoryABI = SBTokenFactory.abi;
const factoryContract : HexString = `0x${SBTokenFactory.networks[11155111].address}`;
// 0x2DDE1632f75258329877c29398Ba29331d6a42C4

const ManageUni = () => {

    const [uniId, setUniId] = useState<number>(0);
    const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);
    // const [uniTokenAddr, setUniTokenAddr] = useState<string>("some-uni-token-address");

    const { chain } = useNetwork();
    const { isConnected } = useAccount();
    
    // useContractRead
    const { data: uniTokenAddress, isError, isLoading } = useContractRead({
        address: factoryContract,
        abi: factoryABI,
        functionName: 'uniIdToAddress',
        args: [uniId],
    });

    if (isError && isLoading) console.log("error");
    console.log(`data ${uniTokenAddress}, isError ${isError}, isLoading ${isLoading}`);

    useEffect(() => {
        if(!isReadyToSubmit) return;
        // redirect to /uni/manage/uniTokenAddress
        // setUniTokenAddr(uniTokenAddress);
        redirect(`/uni/manage/${uniTokenAddress}`);
    }, [isReadyToSubmit]);

    function handleSubmit (e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsReadyToSubmit(true);
    }

    if (!isConnected) return (<main className="flex min-h-screen flex-col items-center justify-between p-24">Connect to wallet</main>);
    if (chain?.id !== 11155111) return (<main className="flex min-h-screen flex-col items-center justify-between p-24">Connect to Sepolia</main>);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="font-mono font-bold flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800  dark:from-inherit static w-auto  rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
                    ManageUni
                </p>
            </div>
            <div className='flex-col align-center justify-center p-5'>
                <div>
                    Please go to CreateUni to create a new SBT Token
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex justify-between p-2'>
                        <label htmlFor="uni-id">University Id</label>
                        <input className='border border-gray-300' type="text" name="uni-id" onChange={(e) => setUniId(e.target.value)}/>
                    </div>
                    <div className='flex justify-center p-2'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default ManageUni