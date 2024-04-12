import React, {useState} from 'react'
import NFTUploader from './NFTUploader'
import MintToken from './MintToken'

export default function UniPage({ uniTokenAddr }: { uniTokenAddr: string }) {
  
    const [stuUri, setStuUri] = useState("");
  
    return (
      <>
        <div className="mb-6 py-4">
          UniToken Address: 
          <span className="font-semibold">{`${uniTokenAddr}`}</span>
        </div>

        <NFTUploader stuUri={stuUri} setStuUri={setStuUri} />

        {stuUri && <div>tokenUri: {stuUri}</div>}
        
        <MintToken uniTokenAddr={uniTokenAddr} stuUri={stuUri} />
      </>
    );
  }