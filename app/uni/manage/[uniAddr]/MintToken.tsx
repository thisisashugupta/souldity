import React, { useState, useEffect } from 'react'
import { abi } from '@/contracts/SBToken/SBToken.abi'
import { HexString } from '@/types/basic'
import { useFunctionCall } from '@/hooks/useFunctionCall'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'

export default function MintToken({uniTokenAddr, stuUri}: { uniTokenAddr: string, stuUri: string }) {
  
  // INPUT FORM STATE
  const [isAddressValid, setIsAddressValid] = useState<boolean>(true)
  
  // in this order
  const [stuEthAddress, setStuEthAddress] = useState<HexString | null>(null)
  // stuUri is passed as prop
  const [stuId, setStuId] = useState<number>(0)
  const [stuName, setStuName] = useState<string>("")
  const [stuBranch, setStuBranch] = useState<string>("")
  const [stuBirthDate, setStuBirthDate] = useState<number>(0)
  const [stuYearOfAdmission, setStuYearOfAdmission] = useState<number>(0)

/**
 * function safeMint(
        address to, 
        string memory uri,
        uint32 _stu_id,
        string memory _stu_name,
        string memory _stu_branch,
        uint32 _stu_birthdate,
        uint16 _stu_year_of_admission
    ) public onlyOwner
*/

  const [args, setArgs] = useState<[HexString, string, number, string, string, number, number] | null>(null)
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false)
  const [txLoading, setTxLoading] = useState<boolean>(false)
  const [buttonMessage, setButtonMessage] = useState<string>('Create')
  const [txnSuccess, setTxnSuccess] = useState<any>(null)



// TODO: ADD CODE FROM CREATE UNI PAGE

  console.log(args);

  const {
    handleSubmit, 
    isContractWaitLoading, 
    isContractWaitSuccess, 
    txnHash,
    txnWaitData
  } = useFunctionCall({
    functionName: 'safeMint',
    args: args as any[],
    abi,
    address: uniTokenAddr as HexString
  })

  txnWaitData && console.log(txnWaitData);

  useEffect(() => {
    // check if stuEthAddress is valid
    if (stuEthAddress && stuEthAddress.length === 42 && stuEthAddress.startsWith("0x")) {
      // stuEthAddress is valid
      !isAddressValid && setIsAddressValid(true)
    } else {
      // stuEthAddress is not valid
      isAddressValid && setIsAddressValid(false)
    }
  }, [stuEthAddress])
  
  useEffect(() => {
    setArgs([stuEthAddress!, stuUri, stuId, stuName, stuBranch, stuBirthDate, stuYearOfAdmission])
    setIsReadyToSubmit(true)
  }, [stuEthAddress, stuId, stuUri, stuName, stuBranch, stuBirthDate, stuYearOfAdmission])

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   try {
  //       console.log(args)
  //       writeContract(data!.request)
  //   } catch (error) {
  //       console.log('There was an error while writing txn')
  //       console.error(error)
  //   }
  // }


  return (
    <div className="flex flex-col items-center">

        <Heading>Enter Student Details</Heading>

            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <label>
                  {/* isAddressValid */}
                  {!isAddressValid && <p className='text-red-500 font-bold'>Enter Valid ETH Address</p>}
                  ETH Address:
                  <Input
                    type="text"
                    name="student_eth_address"
                    onChange={(e) => setStuEthAddress(e.target.value as HexString)}
                    placeholder='0x0c093868DAC0514B99e4d4CfB0880ee5Fa5A711B'
                  />
                </label>
              </div>

              <div className="mb-4">
                <label>
                  ID Number:
                  <Input
                    type="number"
                    name="student_id"
                    onChange={(e) => setStuId(Number(e.target.value))}
                    placeholder='236'
                    />
                </label>
              </div>

              <div className="mb-4">
                <label>
                  Name:
                  <Input
                    type="text"
                    name="student_name"
                    onChange={(e) => setStuName(e.target.value)}
                    placeholder='John Doe'
                    />
                </label>
              </div>

              <div className="mb-4">
                <label>
                  Branch:
                  <Input
                    type="text"
                    name="student_branch"
                    onChange={(e) => setStuBranch(e.target.value)}
                    placeholder='CSE'
                  />
                </label>
              </div>

              <div className="mb-4">
                <label>
                  Date of Birth:
                  <Input
                    type="number"
                    name="student_birthdate"
                    onChange={(e) => setStuBirthDate(Number(e.target.value))}
                    placeholder='01012000'
                    // TODO: add date picker
                    // TODO: contract changes
                    // TODO: add validation
                  />
                </label>
              </div>
              
                <div className="mb-4">
                  <label>
                    Year of Admission:
                  <Input
                    type="number"
                    name="student_year_of_admission"
                    onChange={(e) => setStuYearOfAdmission(Number(e.target.value))}
                    placeholder='2020'
                  />
                  </label>
                </div>

              <div className='mb-4 text-center'>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  type="submit"
                >
                  safeMint
                </button>
              </div>

            </form>

        {txnSuccess && <div>{`Success ?? ${txnSuccess}`}</div>}
    </div>
  )
}