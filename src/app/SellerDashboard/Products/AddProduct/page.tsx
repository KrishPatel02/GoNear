import AddProductForm from '@/Forms/AddProductForm'
import { AddProductProvider } from '@/Context/ProductDataContext'
import React from 'react'

const page = () => {
  return (
    <div className='mt-24'>
        <AddProductProvider>
          <AddProductForm />
        </AddProductProvider>
    </div>
  )
}

export default page