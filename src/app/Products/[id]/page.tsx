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
  // console.log("productId", productId)

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

  const handleAddToCart = () => {
    if (!product) return;

    // Retrieve the existing cart from localStorage
    const existingCart = localStorage.getItem('MyCart');
    const cart = existingCart ? JSON.parse(existingCart) : {};

    // Check if the product is already in the cart
    if (cart[productId]) {
      // Increase the quantity of the existing product
      cart[productId].quantity += 1;
    } else {
      // Add the new product with quantity 1
      cart[productId] = { ...product, quantity: 1 };
    }

    // Update the cart in localStorage
    localStorage.setItem('MyCart', JSON.stringify(cart));
    toast.success('Product added to cart');
  };

  const handleRemoveFromCart = () => {
   
      localStorage.removeItem('MyCart');
      toast.success('Product removed from cart');
   
  };

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
      <button
        onClick={handleAddToCart}
        className='bg-colorOne text-white px-5 py-2 flex items-center mt-2'
      >
        Add to Cart
      </button>
      {/* <button
        onClick={handleRemoveFromCart}
        className='bg-red-600 text-white px-5 py-2 flex items-center mt-2'
      >
        Remove from Cart
      </button> */}
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;