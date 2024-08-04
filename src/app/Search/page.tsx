// "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { CircularProgress, Typography } from '@mui/material';
// import ProductCard from '@/Components/ProductCard';
// import { useFetchProducts } from '@/Context/ProductDataContext';
// import { Product } from '@/types';

// const SearchResultsPage = () => {
//   const { state, fetchProducts } = useFetchProducts();
//   const { products, loading, error } = state;
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const searchParams = useSearchParams();
//   const searchTerm = searchParams.get('term') || '';

//   useEffect(() => {
//     fetchProducts('');
//   }, [fetchProducts]);

//   useEffect(() => {
//     if (products) {
//       const lowercasedTerm = searchTerm.toLowerCase();
//       const filtered = products.filter(product =>
//         product.productName.toLowerCase().includes(lowercasedTerm) ||
//         product.category.toLowerCase().includes(lowercasedTerm)
//       );
//       setFilteredProducts(filtered);
//     }
//   }, [searchTerm, products]);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <Typography color="error">{error}</Typography>;
//   }

//   return (
//     <div className="bg-colorFour h-full w-full flex flex-col items-center">
//       <div className="flex flex-col items-center p-4">
//         <Typography variant="h4">Search Results for "{searchTerm}"</Typography>
//       </div>
//       <div className="flex bg-colorTwo overflow-x-scroll px-10 gap-5 justify-between items-center">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map(product => (
//             <ProductCard key={product.id} {...product} Page="search" />
//           ))
//         ) : (
//           <Typography>No products found</Typography>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResultsPage;

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

  // useEffect(() => {
  //   console.log("Products:", products); 
  // }, [products]);

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
    <div className="bg-colorFour pt-52 h-full w-full flex flex-col">
      <div className="flex bg-colorTwo overflow-x-scroll px-10 gap-5 h-full w-full items-center">
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
