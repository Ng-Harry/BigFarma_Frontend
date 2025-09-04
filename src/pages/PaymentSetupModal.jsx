import React from 'react'
import Input from "../components/shared/Input";
import { ChevronDown } from 'lucide-react';
const PaymentSetup = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50 '>
      <div className='w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg mx-4 '>
        <h3 className='text-xl font-semibold mb-4 mx-2.5'>Set up your withdrawal account</h3>
        <p className='mb-4 mx-2.5'>Enter your bank or mobile money details so you can get paid directly when your products sell.</p>

        <div className='flex flex-col gap-4 p-4  mb-6 rounded font-semibold'>
            <div>
                <label className='block mb-2 '>Account Holder Name</label>
                <Input 
                    placeholder='John Doe'
                    className='placeholder:text-base placeholder:font-bold text-grey-200'
                />
            </div>
            <div>
                <label className='block mb-2'>Bank</label>
                <Input 
                    placeholder='ABC Bank'
                   className='placeholder:text-base placeholder:font-bold text-grey-200'
                />
            </div>
            <div className='relative'>
                <label className='block mb-2 '>Account Number</label>
                <Input 
                    placeholder='123456789'
                     className='placeholder:text-base placeholder:font-bold text-grey-200'
                />
                <ChevronDown className='absolute right-3 top-11 text-neutral pointer-events-none' />
            </div>
        <button className='flex-1 bg-primary text-white px-4 py-2.5 mt-3 rounded hover:bg-primary-dark'>
          Link Account
        </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSetup
