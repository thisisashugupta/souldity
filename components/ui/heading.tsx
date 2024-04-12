import React from 'react'

export function Heading({children} : {children: string}) {
  return (
    <p className="text-3xl font-bold flex justify-center p-6">
        {children}
    </p>
  )
}