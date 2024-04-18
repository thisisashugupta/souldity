import { useReadContract } from 'wagmi'
import { abi } from '@/contracts/SBToken/abi'

import { HexString } from '@/types/basic'
import { University } from '@/types/SBToken'

function useSBToken({address}: {address: HexString}) {

  const result = useReadContract({
    abi,
    address,
    functionName: 'uni',
  })

  const uni = result?.data as [string, string, HexString]
  if (!uni) return uni

  const university: University = {
    uni_name: uni?.[0],
    uni_address: uni?.[1],
    uni_owner: uni?.[2]
  }
  
  return university
}

export default useSBToken