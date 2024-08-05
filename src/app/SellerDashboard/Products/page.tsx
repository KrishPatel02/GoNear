"use client";
import React from "react";
import SellerProductPage from "@/Components/SellerProductPage";
import { FetchProductsProvider } from "@/Context/ProductDataContext"; // Import the provider

const Page = () => {
  return (
    <FetchProductsProvider>
      <main className="col-span-4 row-span-4 w-full h-full  ">
        <SellerProductPage />
      </main>
    </FetchProductsProvider>
  );
};

export default Page;
