"use client"

import React from 'react'

function CreateUni() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="font-mono font-bold fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    CreateUni
                </p>
            </div>
            <div>
                <div className='flex justify-between'>
                    <label htmlFor="UniName">Name</label>
                    <input className='border border-gray-300' type="text" name='UniName' />
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="UniAddress">Address</label>
                    <input className='border border-gray-300' type="text" name='UniAddress' />
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="UniStudents">Number of students</label>
                    <input className='border border-gray-300' type="text" name='UniStudents' />
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="UniName">University Name</label>
                    <input className='border border-gray-300' type="text" name='UniName' />
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="UniName">University Name</label>
                    <input className='border border-gray-300' type="text" name='UniName' />
                </div>
            </div>
        </main>
    )
}

export default CreateUni