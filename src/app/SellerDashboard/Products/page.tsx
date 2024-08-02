"use client";
import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import ProductCard from '@/Components/ProductCard';
import { auth } from "@/Firebase/FirebaseConfig"; 
import { FetchProductsProvider, useFetchProducts } from '@/Context/ProductDataContext';

const ProductPage = () => {
  const [sellerID, setSellerID] = useState<string | null>(null);
  const { state, fetchProducts } = useFetchProducts();
  const { products, loading, error } = state;

  useEffect(() => {
    const fetchSellerID = () => {
        const user = auth.currentUser;
        console.log("user from add product form",user);
        if (user) {
            setSellerID(user.uid);
        }
    };

    fetchSellerID();
}, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const userProducts = products?.filter(product => product.sellerID === sellerID);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="flex h-screen">
      <main className="w-4/5 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Products</h2>
        <div className="flex flex-wrap justify-between items-center">
          {userProducts?.map(product => (
            <ProductCard key={product.id} {...product} Page="product" />
          ))}
        </div>
      </main>
    </div>
  );
};

const Page = () => (
  <FetchProductsProvider>
    <ProductPage />
  </FetchProductsProvider>
);

export default Page;
