"use client"

import React, { useState, useEffect } from 'react'
import NFTUploader from './NFTUploader';

export default function UniPage({ params }: { params: { uniAddr: string } }) {

  const uniTokenAddr = params.uniAddr;

  // state
  const [ stuEthAddress, setStuEthAddress ] = useState("");
  const [ stuId, setStuId ] = useState("");
  const [ stuUri, setStuUri ] = useState("");
  const [ stuName, setStuName ] = useState("");
  const [ stuBranch, setStuBranch ] = useState("");
  const [ stuBirthDate, setStuBirthDate ] = useState("");
  const [ stuYearOfAdmission, setStuYearOfAdmission ] = useState("");
  const [ipfsUrl, setIpfsUrl] = useState(null);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);
  const [args, setArgs] = useState<any>([]);

  useEffect(() => {
    setArgs([stuEthAddress, stuUri, stuId, stuName, stuBranch, stuBirthDate, stuYearOfAdmission]);
  }, [stuEthAddress, stuId, stuUri, stuName, stuBranch, stuBirthDate, stuYearOfAdmission]);

  useEffect(() => {

  }, [isReadyToSubmit]);

  // global functions

  function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("handleSubmit");
  }

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