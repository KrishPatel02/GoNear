"use client";

import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useFetchProducts } from '@/Context/ProductDataContext';
import ProductCard from '@/UI/ProductCard';


const HomePage = () => {
  const { state } = useFetchProducts();
  const { loading, error } = state;
  

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }


  return (
    <div className=" py-5 flex flex-col items-center h-full w-full">
      <div className="flex flex-wrap px-5 gap-5 h-full justify-center items-center hide-scrollbar">
        {state.products?.length > 0 ? (
            state.products?.map(product => (
              <ProductCard key={product.id} {...product} Page="home" />
            ))
          ) : (
            <Typography>No products available</Typography>
        )}
      </div>
    </div>
  );
};

export default HomePage;


