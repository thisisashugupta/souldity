"use client"

import { useWatchContractEvent } from 'wagmi'
import { HexString } from '@/types/basic'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import SBTokenFactory from '@/contracts/SBTokenFactory/SBTokenFactory'
const abi = SBTokenFactory.abi;
const address = SBTokenFactory.networks[11155111].address as HexString;

function ListenTokenCreationEvents() {
    
    const router = useRouter()

    useWatchContractEvent({
        address,
        abi,
        eventName: 'SBTokenDeployed', 
        onLogs(logs) {
            const log: any = logs[0]
            const sbTokenAddress = log.args.sbTokenAddress
            console.log('sbTokenAddress', sbTokenAddress)
            toast.success(`SBToken Deployed`)
            toast(`Redirecting in 5 seconds`)
            setTimeout(() => router.push(`/uni/manage/${sbTokenAddress}`), 5000)

        },
    })
}

export default ListenTokenCreationEvents