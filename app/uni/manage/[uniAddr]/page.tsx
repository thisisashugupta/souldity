"use client"

import React, { useState, useEffect } from 'react'
import NFTUploader from './NFTUploader'
import { SBToken } from '@/contracts/SBToken'
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
type HexString = `0x${string}`;

const contractABI = SBToken.abi;
const SBTcontract : HexString = `0x${SBToken.networks[11155111].address}`;

export default function UniPage({ params }: { params: { uniAddr: string } }) {

  const uniTokenAddr = params.uniAddr;
  // const uniTokenAddr = SBTcontract;

  // state
  const [txnSuccess, setTxnSuccess] = useState<any>(null);
  const [ stuEthAddress, setStuEthAddress ] = useState("");
  const [ stuId, setStuId ] = useState("");
  const [ stuUri, setStuUri ] = useState("");
  const [ stuName, setStuName ] = useState("");
  const [ stuBranch, setStuBranch ] = useState("");
  const [ stuBirthDate, setStuBirthDate ] = useState("");
  const [ stuYearOfAdmission, setStuYearOfAdmission ] = useState("");
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);
  const [args, setArgs] = useState<any>([]);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  console.log("start");



  const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
    address: uniTokenAddr,
    abi: contractABI,
    enabled: isReadyToSubmit,
    functionName: 'safeMint',
    chainId: chain?.id,
    account: address,
    args
  });

  if (isPrepareError) {
    console.warn(`error in usePrepareContractWrite`);
    console.error(prepareError);
  };

  console.log(config);
  



  const { data, isLoading, isError, error, write, isSuccess, status } = useContractWrite(config);

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

// console.log(`data: ${txnData}, isLoading: ${isContractLoading}, isSuccess: ${writeSuccess}`);
console.log(` Transaction: ${JSON.stringify(data)}`);
console.log("end");
  
  useEffect(() => {
    setArgs([stuEthAddress, stuUri, stuId, stuName, stuBranch, stuBirthDate, stuYearOfAdmission]);
    setIsReadyToSubmit(true);
  }, [stuEthAddress, stuId, stuUri, stuName, stuBranch, stuBirthDate, stuYearOfAdmission]);

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

  // global functions

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        console.log('Sending TX')
        console.log(args)
        console.log(write);
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

  // return jsx

  return (<>
  <div>
  <NFTUploader stuUri={stuUri} setStuUri={setStuUri} />
  </div>
  <div><h1>Mint Token to students</h1></div>
  <div>UniToken Address: <span className='font-semibold'>{`${uniTokenAddr}`}</span></div>
  <div>
    <div>{stuUri && <>tokenUri: {stuUri}</>}</div>
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
      <div>
          <div><label htmlFor="student_eth_address">student_eth_address</label></div>
          <div><input type="text" name='student_eth_address' onChange={(e) => setStuEthAddress(e.target.value)}/></div>
        </div>
        <div>
          <div><label htmlFor="student_id">student_id</label></div>
          <div><input type="text" name='student_id' onChange={(e) => setStuId(e.target.value)}/></div>
        </div>
        <div>
          <div><label htmlFor="student_name">student_name</label></div>
          <div><input type="text" name='student_name' onChange={(e) => setStuName(e.target.value)}/></div>
        </div>
        <div>
          <div><label htmlFor="student_branch">student_branch</label></div>
          <div><input type="text" name='student_branch' onChange={(e) => setStuBranch(e.target.value)}/></div>
        </div>
        <div>
          <div><label htmlFor="student_birthdate">student_birthdate</label></div>
          <div><input type="text" name='student_birthdate' onChange={(e) => setStuBirthDate(e.target.value)}/></div>
        </div>
        <div>
          <div><label htmlFor="student_year_of_admission">student_year_of_admission</label></div>
          <div><input type="text" name='student_year_of_admission' onChange={(e) => setStuYearOfAdmission(e.target.value)}/></div>
        </div>
        <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit'>safeMint</button></div>
      </form>
    </div>
  </div>
  </>);

}