import React from 'react'
import { Link } from 'react-router-dom'
import '../app.css'

const SupportPage = () => {
    return <section className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-10 w-md mx-auto lg:w-3xl'>
            <div className='text-center space-y-2'>
                <h2 className='text-3xl font-semibold lg:text-4xl'>Need help?</h2>
                <p className='lg:text-lg text-[var(--color-neutral)]'>Explore the following support options</p>
            </div>

            <div className='capitalize font-medium text-xl flex flex-col gap-4'>
                <Link to={""} className='py-10 px-16 text-center border-2 border-slate-100 rounded-xl hover:bg-slate-100 hover:font-bold transition duration-300 ease-in-out'>FAQ / help center</Link>
                <Link to={""} className='py-10 px-16 text-center border-2 border-slate-100 rounded-xl hover:bg-slate-100 hover:font-bold transition duration-300 ease-in-out'>In-App chat</Link>
                <Link to={""} className='py-10 px-16 text-center border-2 border-slate-100 rounded-xl hover:bg-slate-100 hover:font-bold transition duration-300 ease-in-out'>Email support</Link>
                <Link to={""} className='py-10 px-16 text-center border-2 border-slate-100 rounded-xl hover:bg-slate-100 hover:font-bold transition duration-300 ease-in-out'>Phone hotline</Link>
            </div>
        </div>
    </section>
}

export default SupportPage