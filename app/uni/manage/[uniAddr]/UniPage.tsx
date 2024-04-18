import {useState} from 'react'
// components
import UniDetails from './UniDetails'
import NFTUploader from './NFTUploader'
import MintToken from './MintToken'
// types
import { HexString } from '@/types/basic'
import { University } from '@/types/SBToken'

export default function UniPage({ uni, uniTokenAddr }: { uni: University, uniTokenAddr: HexString }) {
    const [stuUri, setStuUri] = useState<string>("")

    return (
      <div>
        <UniDetails uni={uni} uniTokenAddr={uniTokenAddr} />
        <NFTUploader stuUri={stuUri} setStuUri={setStuUri} />        
        <MintToken uniTokenAddr={uniTokenAddr} stuUri={stuUri} />
      </div>
    );
  }