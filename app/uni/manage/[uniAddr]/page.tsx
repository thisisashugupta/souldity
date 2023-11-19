"use client";

import React, { useState, useEffect } from "react";
import NFTUploader from "./NFTUploader";

export default function UniPage({ params }: { params: { uniAddr: string } }) {
  const uniTokenAddr = params.uniAddr;

  // state
  const [stuEthAddress, setStuEthAddress] = useState("");
  const [stuId, setStuId] = useState("");
  const [stuUri, setStuUri] = useState("");
  const [stuName, setStuName] = useState("");
  const [stuBranch, setStuBranch] = useState("");
  const [stuBirthDate, setStuBirthDate] = useState("");
  const [stuYearOfAdmission, setStuYearOfAdmission] = useState("");
  const [ipfsUrl, setIpfsUrl] = useState(null);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);
  const [args, setArgs] = useState<any>([]);

  useEffect(() => {
    setArgs([
      stuEthAddress,
      stuUri,
      stuId,
      stuName,
      stuBranch,
      stuBirthDate,
      stuYearOfAdmission,
    ]);
  }, [
    stuEthAddress,
    stuId,
    stuUri,
    stuName,
    stuBranch,
    stuBirthDate,
    stuYearOfAdmission,
  ]);

  useEffect(() => {}, [isReadyToSubmit]);

  // global functions

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("handleSubmit");
  }

  // return jsx

  return (
    <>
      <div>
        <NFTUploader stuUri={stuUri} setStuUri={setStuUri} />
      </div>
      <div className="flex flex-col items-center justify-center p-12">
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex mb-10 md:mb-8">
          <p className="text-3xl font-bold flex w-full justify-center p-5 dark:bg-zinc-800/30">
            Mint Token To Students
          </p>
        </div>

        <div className="mb-6 py-4">
          UniToken Address:{" "}
          <span className="font-semibold">{`${uniTokenAddr}`}</span>
        </div>
        <div>
          <div>{stuUri && <>tokenUri: {stuUri}</>}</div>
          <div>
            <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
              <div className="md:flex md:items-center gap-4 mb-4">
                <div className="md:w-1/3">
                  <label
                    className="text-base block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="student_eth_address"
                  >
                    student eth address
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="student_eth_address"
                    onChange={(e) => setStuEthAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center gap-4 mb-4">
                <div className="md:w-1/3">
                  <label
                    className="text-base block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="student_id"
                  >
                    student id
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="student_id"
                    onChange={(e) => setStuId(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center gap-4 mb-4">
                <div className="md:w-1/3">
                  <label
                    className="text-base block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="student_name"
                  >
                    student name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="student_name"
                    onChange={(e) => setStuName(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center gap-4 mb-4">
                <div className="md:w-1/3">
                  <label
                    className="text-base block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="student_branch"
                  >
                    student branch
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="student_branch"
                    onChange={(e) => setStuBranch(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center gap-4 mb-4">
                <div className="md:w-1/3">
                  <label
                    className="text-base block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="student_birthdate"
                  >
                    student birthdate
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="student_birthdate"
                    onChange={(e) => setStuBirthDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center gap-4 mb-4">
                <div className="md:w-1/3">
                  <label
                    className="text-base block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="student_year_of_admission"
                  >
                    student year of admission
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="student_year_of_admission"
                    onChange={(e) => setStuYearOfAdmission(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w:2/3"><button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  safeMint
                </button></div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
