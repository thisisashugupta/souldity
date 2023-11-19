"use client"

import React, { useState, useEffect } from 'react'
import SBTokenFactory from '@/contracts/SBTokenFactory'
import { useContractRead } from 'wagmi'
type HexString = `0x${string}`;

const factoryABI = SBTokenFactory.abi;
const factoryContract : HexString = `0x${SBTokenFactory.networks[11155111].address}`;
// 0x2DDE1632f75258329877c29398Ba29331d6a42C4
console.log("factoryContract", factoryContract, typeof factoryContract);

export default function UniPage({ params }: { params: { uniAddr: string } }) {

  const uniId = params.uniAddr;
  console.log("uniId:", uniId);

  // state
  const [ stuEthAddress, setStuEthAddress ] = useState("");
  const [ stuId, setStuId ] = useState("");
  const [ stuUri, setStuUri ] = useState("");
  const [ stuName, setStuName ] = useState("");
  const [ stuBranch, setStuBranch ] = useState("");
  const [ stuBirthDate, setStuBirthDate ] = useState("");
  const [ stuYearOfAdmission, setStuYearOfAdmission ] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState(null);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);
  const [args, setArgs] = useState<any>([]);

  useEffect(() => {
    setArgs([stuEthAddress, stuUri, stuId, stuName, stuBranch, stuBirthDate, stuYearOfAdmission]);
  }, [stuEthAddress, stuId, stuUri, stuName, stuBranch, stuBirthDate, stuYearOfAdmission]);

  useEffect(() => {

  }, [isReadyToSubmit]);

  // useContractRead
  const { data: uniTokenAddress, isError, isLoading } = useContractRead({
    address: factoryContract,
    abi: factoryABI,
    functionName: 'uniIdToAddress',
    args: [uniId],
  });

  if (isError && isLoading) console.log("error");
  console.log("data, isError, isLoading"); 
  console.log(uniTokenAddress, isError, isLoading);


  // global functions

  function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("handleSubmit");
    console.log('Selected Image:', selectedImage);
  }

  function handleImageChange (e : any) {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedImage(file);
    // upload to ipfs
    // and display url
    // setIpfsUrl(url);
  };

  // return jsx

  return (<>
  <div>University ID: {params.uniAddr}</div>
  <div>UniToken Address: <span className='font-semibold'>{`${uniTokenAddress}`}</span></div>
  <div>
    <div><p>Mint Token to students</p></div>
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
        <div>
          <div><label htmlFor="student_image">student_image</label></div>
          <div><input type="file" accept="image/*" name='student_image' onChange={handleImageChange} /></div>
          <div>{ipfsUrl}</div>
        </div>
        <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit'>safeMint</button></div>
      </form>
    </div>
  </div>
  </>);

}