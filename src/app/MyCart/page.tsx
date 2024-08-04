"use client";

import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import ProductCard from '@/UI/ProductCard'; // Adjust import as necessary
import { Product } from '@/types';

interface CartProduct extends Product {
  quantity: number;
}

const MyCartPage = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Retrieve the cart from localStorage
      const storedCart = localStorage.getItem('MyCart');
      if (storedCart) {
        const cartObject: { [key: string]: CartProduct } = JSON.parse(storedCart);
        // Convert the cart object to an array
        const cartProductsArray = Object.values(cartObject);
        setCartProducts(cartProductsArray);
      } else {
        setCartProducts([]);
      }
    } catch (err) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="my-cart-page mt-20 mx-5">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Cart</h2>
      <div className="flex flex-wrap justify-evenly items-center">
        {cartProducts.length > 0 ? (
          cartProducts.map(product => (
            <ProductCard 
              Page={'product'} 
              key={product.id} 
              {...product} 
              quantity={product.quantity} // Pass the quantity to ProductCard
            />
          ))
        ) : (
          <Typography>No products in the cart</Typography>
        )}
      </div>
    </div>
  );
};

export default MyCartPage;
