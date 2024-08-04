"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Product } from '@/types';
import { db } from '@/Firebase/FirebaseConfig';
import Link from 'next/link';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const productId = id as string;
  console.log("productId", productId)

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        toast.error('Product ID is missing');
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'Products', productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data() as Product);
        } else {
          toast.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product: ', error);
        toast.error('Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='py-5 mx-auto w-fit'>
      <h1 className='text-2xl font-bold mb-4'>{product.productName}</h1>
      {product.productImage && (
        <img src={product.productImage} alt={product.productName} className='w-96 h-96 mb-4' />
      )}
      <p className='text-lg mb-2'><strong>Description:</strong> {product.description}</p>
      <p className='text-lg mb-2'><strong>Category:</strong> {product.category}</p>
      <p className='text-lg mb-2'><strong>Price:</strong> ${product.price}</p>
      <Link href={`/Checkout/${productId}`} className='bg-colorOne text-white px-5 py-2 flex items-center'>Buy now</Link>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;