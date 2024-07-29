import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl font-bold"><span className='text-colorOne'>Wellcome </span>,
                New User Choose One</h1>

            <Link className='bg-colorFour hover:shadow-xl shadow-colorTwo text-colorOne px-5 py-2 rounded-lg text-xl text-bold' href={'Signup/CustomerSignup'}>SignUp As a Customer</Link>
            <Link className='bg-colorFour hover:shadow-xl shadow-colorTwo text-colorOne px-5 py-2 rounded-lg text-xl text-bold' href={"/BecomeSeller"}>SignUp As a Seller</Link>
        </div>
    )
}

export default page
