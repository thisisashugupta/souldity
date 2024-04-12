import Link from 'next/link'
import Image from 'next/image'
import Github from '@/public/github-mark-white.png'

function footer() {
  return (
    <footer className="bg-blue-500 fixed bottom-0 z-10 border-b-2 border-black w-full flex justify-center items-center text-sm backdrop-blur p-2">
    <nav>
        <Link href={"https://github.com/thisisashugupta/souldity"} target='_blank'>
            <Image className='w-6' src={Github} alt={"Github_Logo"} priority />
        </Link>
    </nav>
    </footer>
  )
}

export default footer
