import { University } from '@/types/SBToken'
import { HexString } from '@/types/basic'
import { Heading } from '@/components/ui/heading'

function UniDetails({uni, uniTokenAddr}: {uni: University, uniTokenAddr: HexString}) {
  return (
    <div>
        <Heading>University Details</Heading>
        <div className="mb-4 text-sm text-center font-semibold">
            <p>{uni.uni_name}</p>
            <p>{uni.uni_address}</p>
            <br />
            <p className="text-gray-500">Owner</p>
            <p>{uni.uni_owner}</p>
            <br />
            <p className="text-gray-500">Token Address</p>
            <p>{uniTokenAddr}</p>
        </div>
    </div>
  )
}

export default UniDetails
