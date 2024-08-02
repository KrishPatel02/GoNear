"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { CircularProgress, Typography, TextField, Button } from '@mui/material';
import ProductCard from './ProductCard';
import { useFetchProducts } from '@/Context/ProductDataContext';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const { state } = useFetchProducts();
  const { products, loading, error } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();

  // console.log("state", state)

  useEffect(() => {
    if (products) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = products.filter(product =>
        product.productName.toLowerCase().includes(lowercasedTerm) ||
        product.category.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    router.push(`/Search?term=${encodeURIComponent(searchTerm)}`);
  }, [router, searchTerm]);


  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }


  return (
    <div className="bg-colorFour mt-36 h-full w-full flex flex-col">
       <div className="flex justify-evenly w-[50%] mx-auto items-center p-4">
       <TextField 
          label="Search by Product Name or Category..." 
          variant="outlined" 
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-4 w-96"
        />
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <div className="flex bg-colorTwo overflow-x-scroll px-10 gap-5 justify-between items-center">
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


