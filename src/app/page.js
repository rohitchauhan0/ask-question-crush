"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const router = useRouter()
  return (
    <div className=' flex items-center justify-center h-screen bg-gray-100 flex-col space-y-4 relative'>
      <Image src="/person.png" width={200} height={200} alt="logo" />
      <Image src="/question.png" width={50} height={50} alt="logo" className='absolute top-0 right-0 opacity-30' />
      <Image src="/question.png" width={50} height={50} alt="logo" className='absolute bottom-20 right-20 opacity-30' />
      <Image src="/question.png" width={50} height={50} alt="logo" className='absolute top-32 left-0 opacity-30' />
      <Image src="/question.png" width={50} height={50} alt="logo" className='absolute bottom-32 left-72 opacity-30' />

      <Image src="/shrug.png" width={50} height={50} alt="logo" className='absolute top-32 left-72 opacity-30' />
      <Image src="/shrug.png" width={50} height={50} alt="logo" className='absolute bottom-32 top-3 opacity-30' />
      <Image src="/shrug.png" width={50} height={50} alt="logo" className='absolute bottom-32 right-72 opacity-30' />
        <h1 className='lg:text-7xl text-2xl font-bold text-pink-500 font-serif'>Give your Answer</h1>
        <p className=' text-gray-400 text-lg italic'>You have to answer with honesty</p>
        <button className='bg-pink-500 text-white font-bold py-2 px-4 rounded' onClick={() => router.push("/questions")}>Start Questions</button>
    </div>
  )
}

export default Page