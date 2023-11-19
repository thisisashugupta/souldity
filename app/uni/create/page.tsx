"use client"

import React, { useState } from 'react'
import SBTokenFactory from '@/contracts/SBTokenFactory'
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
type HexString = `0x${string}`;

const factoryABI = SBTokenFactory.abi;
const factoryContract : HexString = `0x${SBTokenFactory.networks[11155111].address}`;
// 0x2DDE1632f75258329877c29398Ba29331d6a42C4
console.log(factoryContract, typeof factoryContract);

const CreateUni = () => {

    const [uniName, setUniName] = useState<string>("");
    const [uniAddress, setUniAddress] = useState<string>("");
    const [tokenName, setTokenName] = useState<string>("");
    const [tokenSymbol, setTokenSymbol] = useState<string>("");
    const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);
    const [args, setArgs] = useState<[string, string, string, string]>(['','','','']);

    const { chain, chains } = useNetwork();
    const { address, isConnected, isConnecting, isDisconnected } = useAccount();

    console.log("usePrepareContractWrite");
    console.log("factoryContract", factoryContract);
    console.log("factoryABI", factoryABI);
    console.log("args",args);

    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        address: factoryContract,
        abi: factoryABI,
        enabled: isReadyToSubmit,
        functionName: 'createUniToken',
        chainId: chain?.id,
        args
    });

    if (isPrepareError) {
        console.log("error in usePrepareContractWrite");
        console.log(prepareError);
    };

    console.log("config");
    console.log(config);
    console.log("useContractWrite");

    const { data, isLoading, isError, error, write, isSuccess, status } = useContractWrite(config);

    if (isError) {
        console.log("error in useContractWrite");
        console.log(error);
    };

    console.log("data, isLoading, isError, write, status");
    console.log(data, isLoading, isError, write, status);
    console.log("useWaitForTransaction");

    const {
        data: txnData,
        isLoading: isContractLoading,
        isSuccess: writeSuccess,
    } = useWaitForTransaction({
        hash: data?.hash,
    })

    if (isLoading) return <div>Processing…</div>
    if (isError) return <div>Transaction error</div>
    // return <div>Transaction: {JSON.stringify(data)}</div>
    console.log(JSON.stringify(data));
    


    console.log("end");    

    function handleSubmit (e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsReadyToSubmit(true);
    }

    function createUniToken() {

        // write
        
    }

    React.useEffect(() => {
        setArgs([tokenName, tokenSymbol, uniName, uniAddress]);
        setIsReadyToSubmit(true);
    }, [tokenName, tokenSymbol, uniName, uniAddress]);

    React.useEffect(() => {
        if(!isReadyToSubmit) return;
        createUniToken();
    }, [isReadyToSubmit]);

    if (!isConnected) return (<main className="flex min-h-screen flex-col items-center justify-between p-24">Connect to wallet</main>);
    if (chain?.id !== 11155111) return (<main className="flex min-h-screen flex-col items-center justify-between p-24">Connect to Sepolia</main>);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="font-mono font-bold flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800  dark:from-inherit static w-auto  rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
                    CreateUni
                </p>
            </div>
            <div className='flex-col align-center justify-center p-5'>
                <form onSubmit={(e) => handleSubmit(e)}>
                <div className='flex justify-between'>
                    <label htmlFor="UniName">Uni Name</label>
                    <input className='border border-gray-300' type="text" name='UniName' onChange={(e) => setUniName(e.target.value)} placeholder='LNMIIT'/>
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="UniAddress">Uni Address</label>
                    <input className='border border-gray-300' type="text" name='UniAddress' onChange={(e) => setUniAddress(e.target.value)} placeholder='Rupa Ki Nangal, Post Sumel'/>
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="TokenName">Token Name</label>
                    <input className='border border-gray-300' type="text" name='TokenName' onChange={(e) => setTokenName(e.target.value)} placeholder='LNM Student Token'/>
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="TokenSymbol">Token Symbol</label>
                    <input className='border border-gray-300' type="text" name='TokenSymbol' onChange={(e) => setTokenSymbol(e.target.value)} placeholder='LNMST' />
                </div>
                <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit'>Submit</button></div>
                </form>
            </div>
        </main>
    )
}

export default CreateUni