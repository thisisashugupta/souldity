import React, {useState} from 'react'
import { Heading } from '@/components/ui/heading';
import NFTUploader from './NFTUploader'
import MintToken from './MintToken'

export default function UniPage({ uniTokenAddr }: { uniTokenAddr: string }) {
  
    const [stuUri, setStuUri] = useState<string>("");
    // TODO: check if uni owner is connected, else show a message
  
    return (
      <div>
        <Heading>Mint your UniTokens to students</Heading>
        <div className="mb-6 py-4 text-sm text-center">
          <p>UniToken:</p>
          <span className="font-semibold">{`${uniTokenAddr}`}</span>
        </div>

        <NFTUploader stuUri={stuUri} setStuUri={setStuUri} />        
        <MintToken uniTokenAddr={uniTokenAddr} stuUri={stuUri} />
      </div>
    );
  }