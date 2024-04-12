import React from 'react'
import Link from 'next/link'

type LinkCardProps = {
  href: string
  title: string
  description?: string
}

function LinkCard({href, title, description}: LinkCardProps) {
  return (
    <Link
          href={href}
          className="px-5 py-4 group rounded-lg border border-gray-500 transition-colors hover:bg-neutral-500/20"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            {title}{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {description}
          </p>
        </Link>
  )
}

export default LinkCard
