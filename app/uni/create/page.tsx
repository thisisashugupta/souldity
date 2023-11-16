"use client"

import React, { useState } from 'react'

function CreateUni() {

    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [num_students, setNum_students] = useState<string>("");

    function createUNI() {
        console.log("createUNI");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="font-mono font-bold flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800  dark:from-inherit static w-auto  rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
                    CreateUni
                </p>
            </div>
            <div className='flex-col align-center justify-center p-5'>
                <form onSubmit={createUNI}>
                <div className='flex justify-between'>
                    <label htmlFor="UniName">Name</label>
                    <input className='border border-gray-300' type="text" name='UniName' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="UniAddress">Address</label>
                    <input className='border border-gray-300' type="text" name='UniAddress' onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="UniStudents">Number of students</label>
                    <input className='border border-gray-300' type="text" name='UniStudents' onChange={(e) => setNum_students(e.target.value)} />
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="UniName">University Name</label>
                    <input className='border border-gray-300' type="text" name='UniName' />
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="UniName">University Name</label>
                    <input className='border border-gray-300' type="text" name='UniName' />
                </div>
                <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit'>Click Me</button></div>
                </form>
            </div>
        </main>
    )
}

export default CreateUni