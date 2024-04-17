// Responsibility: Takes input from user and passes it to the parent component for minting a token
import React, { useState, useEffect } from 'react'
import { HexString } from '@/types/basic'
import { Input } from '@/components/ui/input'

type InputFormProps = {
    stuUri: string,
    isReadyToSubmit: boolean, 
    setIsReadyToSubmit: React.Dispatch<React.SetStateAction<boolean>>, 
    setArgs: React.Dispatch<React.SetStateAction<[`0x${string}`, string, number, string, string, number, number] | null>>,
    handleSubmit: (e: React.FormEvent) => void
}

export default function MintTokenInputForm({
    stuUri, 
    isReadyToSubmit, 
    setIsReadyToSubmit, 
    setArgs, 
    handleSubmit
}: InputFormProps) {

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

  // check if student eth address is valid
  useEffect(() => {
    // TODO: check with wagmi method, { provides checksum check }
    if (stuEthAddress && stuEthAddress.length === 42 && stuEthAddress.startsWith("0x")) {
      !isAddressValid && setIsAddressValid(true)
    } else {
      isAddressValid && setIsAddressValid(false)
    }
  }, [stuEthAddress])

    // set args and check if ready to submit
  useEffect(() => {
    isAddressValid && setArgs([stuEthAddress!, stuUri, stuId, stuName, stuBranch, stuBirthDate, stuYearOfAdmission])
    isAddressValid && setIsReadyToSubmit(true)
  }, [isAddressValid, stuEthAddress, stuId, stuUri, stuName, stuBranch, stuBirthDate, stuYearOfAdmission])

  return (
    <form onSubmit={handleSubmit}>

        {/* ETH Address */}

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

        {/* ID Number */}
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

        {/* Name */}
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

        {/* Branch */}
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

        {/* Date of Birth */}
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
        
        {/* Year of Admission */}
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
  )
}