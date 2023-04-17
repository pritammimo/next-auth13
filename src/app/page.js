import { authOptions } from '@/lib/auth';
import React from 'react'
import { getServerSession } from 'next-auth'
const page = async() => {
  return (
    <div className='flex justify-center items-center p-5 text-green-500 text-lg font-bold'>This is a home page everyone can see</div>
  )
}

export default page