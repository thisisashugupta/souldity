import { useReadContracts } from 'wagmi' 
// import { erc20Abi } from 'viem'
import { HexString } from '@/types/basic'

type UseTokenProps = {
    address: HexString
    abi: any
    functionNames: string[]
}

function useToken({address, abi, functionNames}: UseTokenProps) {

    const length = functionNames.length
    const contracts = Array.from(
        {length}, 
        (_, i) => ({
            address, 
            abi, 
            functionName: functionNames[i]
        })
    )

    const result = useReadContracts({ 
        allowFailure: false, 
        contracts
    }) 

  return { result }
}

export default useToken