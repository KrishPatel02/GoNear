import AddProductForm from '@/Components/AddProductForm'
import { AddProductProvider } from '@/Context/ProductDataContext'
import React from 'react'

const page = () => {
  return (
    <div className='mt-20 w-[45%] mx-auto'>
        <AddProductProvider>
          <AddProductForm />
        </AddProductProvider>
    </div>
  )
}

export default page