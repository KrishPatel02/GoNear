import AddProductForm from '@/Forms/AddProductForm'
import { AddProductProvider } from '@/Context/ProductDataContext'
import React from 'react'

const page = () => {
  return (
    <main className=" col-span-4 row-span-4 w-full ">
        <AddProductProvider>
          <AddProductForm />
        </AddProductProvider>
    </main>
  )
}

export default page