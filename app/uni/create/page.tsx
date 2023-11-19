"use client"

import React, { useState, useEffect } from 'react'
import SBTokenFactory from '@/contracts/SBTokenFactory'
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

type HexString = `0x${string}`;

const factoryABI = SBTokenFactory.abi;
const factoryContract: HexString = `0x${SBTokenFactory.networks[11155111].address}`;
// 0x2DDE1632f75258329877c29398Ba29331d6a42C4
// console.log(factoryContract, typeof factoryContract);

const CreateUni = () => {
    const [txnSuccess, setTxnSuccess] = useState<any>(null);
    const [uniName, setUniName] = useState<string>("");
    const [uniAddress, setUniAddress] = useState<string>("");
    const [tokenName, setTokenName] = useState<string>("");
    const [tokenSymbol, setTokenSymbol] = useState<string>("");
    const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);
    const [args, setArgs] = useState<[string, string, string, string]>(['','','','']);

    const { chain } = useNetwork();
    const { isConnected } = useAccount();

    console.log("start");
    // console.log("args",args);
    // console.log("usePrepareContractWrite");
    // console.log("factoryContract", factoryContract);
    // console.log("factoryABI", factoryABI);

    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        address: factoryContract,
        abi: factoryABI,
        enabled: isReadyToSubmit,
        functionName: 'createUniToken',
        chainId: chain?.id,
        args
    });

    if (isPrepareError) {
        console.warn(`error in usePrepareContractWrite`);
        console.error(prepareError);
    };

    // console.log(`config ${config}`);
    // console.log("useContractWrite");

    const { data, isLoading, isError, error, write, isSuccess, status } = useContractWrite(config);

    if (isError) {
        console.warn("error in useContractWrite");
        console.error(error);
    };

    // console.log(`data ${data}, isLoading: ${isLoading}, write ${write}`);
    // console.log("useWaitForTransaction");

    const {
        data: txnData,
        isLoading: isContractLoading,
        isSuccess: writeSuccess,
    } = useWaitForTransaction({
        hash: data?.hash,
    })

    // console.log(`data: ${txnData}, isLoading: ${isContractLoading}, isSuccess: ${writeSuccess}`);
    console.log(` Transaction: ${JSON.stringify(data)}`);

    console.log("end");


    useEffect(() => {
        setArgs([tokenName, tokenSymbol, uniName, uniAddress]);
        if (tokenName === "") return;
        if (tokenSymbol === "") return;
        if (uniName === "") return;
        if (uniAddress === "") return;
        setIsReadyToSubmit(true);
    }, [tokenName, tokenSymbol, uniName, uniAddress]);

    useEffect(() => {
        if (writeSuccess) {
            console.log(`Returned Data on write success`, data)
            setTxnSuccess(`Success, Transaction submited successfully`);
            console.log({
                title: 'Success',
                description: 'Transaction submited successfully',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
       }, [writeSuccess, data]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            console.log('Sending TX')
            console.log(args)
            if (!!write) {
                console.log("writing");
                await write?.()
                console.log("written");
            }
        } catch (error) {
            console.error(error);
            console.log({
                title: 'Error',
                description: 'There was an error while writing txn',
                status: 'error',
                isClosable: true,
            });
        }
   }

    if (!isConnected) return (<main className="flex min-h-screen flex-col items-center justify-between p-24">Connect to wallet</main>);
    if (chain?.id !== 11155111) return (<main className="flex min-h-screen flex-col items-center justify-between p-24">Connect to Sepolia</main>);
  
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Connect to wallet
      </main>
    );
  if (chain?.id !== 11155111)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Connect to Sepolia
      </main>
    );

  return (
    <main className="flex flex-col items-center justify-center p-12">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex mb-10 md:mb-16">
        <p className="text-3xl font-bold flex w-full justify-center p-5 bg-gray-200 dark:bg-zinc-800/30">
          CreateUni
        </p>
      </div>
      <div className="flex-col align-center justify-center p-5">
        <form className="w-full " onSubmit={(e) => handleSubmit(e)}>


          <div className="md:flex md:items-center mb-4">
            <div className="md:w-1/3">
              <label
                className="text-lg block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="UniName"
              >
                Uni Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                name="UniName"
                onChange={(e) => setUniName(e.target.value)}
                placeholder="LNMIIT"
              />
            </div>
            <div>
                {txnSuccess && <>{`${txnSuccess}`}</>}
            </div>
        </main>
    )
}
          <div className="md:flex md:items-center mb-4">
            <div className="md:w-1/3">
              <label className="text-lg block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="UniAddress">Uni Address</label>
            </div>
            <div className="md:w-2/3" >
              <input
                className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                name="UniAddress"
                onChange={(e) => setUniAddress(e.target.value)}
                placeholder="Rupa Ki Nangal, Post Sumel"
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-4">
            <div className="md:w-1/3"><label className="text-lg block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="TokenName">Token Name</label></div>
            <div className="md:w-2/3"><input
              className="appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="TokenName"
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="LNM Student Token"
            /></div>
            
          </div>

          <div className="md:flex md:items-center mb-4">
            <div className="md:w-1/3"> <label className="text-lg block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="TokenSymbol">Token Symbol</label> </div>
            <div className="md:w-2/3"><input
              className="appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="TokenSymbol"
              onChange={(e) => setTokenSymbol(e.target.value)}
              placeholder="LNMST"
            /></div>
            
          </div>

          <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3"><button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button></div>
            
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateUni;
