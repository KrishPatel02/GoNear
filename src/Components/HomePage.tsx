"use client";

import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useFetchProducts } from '@/Context/ProductDataContext';
import ProductCard from '@/UI/ProductCard';


const HomePage = () => {
  const { state } = useFetchProducts();
  const { loading, error } = state;
  
  // console.log("state", state)

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    console.log(error)
    return <Typography color="error">{error}</Typography>;
  }


  return (
    <div className=" mt-16 py-5 flex flex-col items-center h-full w-full">
      <div className="flex flex-wrap px-10 gap-16 h-full justify-center items-center hide-scrollbar">
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


