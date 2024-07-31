"use client";
import { Product } from '@/types/index';
import EditProductForm from '@/Components/EditProductForm';
import { db } from '@/Firebase/FirebaseConfig';
import { Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { EditProductProvider } from '@/Context/ProductDataContext';

const Page = () => {
  const params = useParams();
  const productId: string = params?.id;
  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      const productDocRef = doc(db, 'Products', productId);
      const product = await getDoc(productDocRef);
    //   console.log(product.data());
      if (product.exists()) {
        setProductData(product.data() as Product);
      }
    };
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  if (!productData) {
    return <div className='text-colorOne'>Loading Product Data ...</div>;
  }

  return (
    <div className='bg-colorFour my-16'>
      <h1 className='text-colorOne w-full flex justify-center text-xl font-sans font-semibold py-5'>Edit Product</h1>
      <EditProductProvider>
        <EditProductForm ProductData={productData} productId={productId} />
      </EditProductProvider>
    </div>
  );
};

export default Page;