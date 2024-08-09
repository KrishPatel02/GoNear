"use client";

import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useFetchProducts } from '@/Context/ProductDataContext';
import { Product } from '@/types';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/UI/ProductCard';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const { state } = useFetchProducts();
  const { products, loading, error } = state;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
 
  useEffect(() => {
    if (products) {
      const searchValue = searchParams.get('term')?.toLowerCase() || '';
      const isCategory = products.some(product =>
        product.category.toLowerCase() === searchValue
      );

      if (isCategory) {
        const filteredByCategory = products.filter(product =>
          product.category.toLowerCase() === searchValue
        );
        setFilteredProducts(filteredByCategory);
      } else {
        const filteredByProductName = products.filter(product =>
          product.productName.toLowerCase().includes(searchValue)
        );
        setFilteredProducts(filteredByProductName);
      }
    }
  }, [products, searchParams]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="pt-20 h-full w-full flex">
    <div className="flex px-10 gap-5 h-full w-full items-center">
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <React.Fragment key={product.id}>
            <ProductCard {...product} Page="home" />
          </React.Fragment>
        ))
      ) : (
        <Typography>No products found</Typography>
      )}
    </div>
  </div>
  );
};

export default SearchPage;
