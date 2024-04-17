import React from 'react'
import Link from 'next/link'
import { Heading } from '@/components/ui/heading'

function page() {
  return (
    <div>
        <Heading>Link to Manage Uni</Heading>
        <div className='px-4 py-2 border-2 border-blue-500 bg-blue-300'>
        <Link href="/uni/manage/0x247283f4d9Db530E21b080Ebd6703C5a517882f6">
            Uni Owner: 0x0c093868DAC0514B99e4d4CfB0880ee5Fa5A711B
        </Link>
        </div>
      
    </div>
  )
}

export default page
