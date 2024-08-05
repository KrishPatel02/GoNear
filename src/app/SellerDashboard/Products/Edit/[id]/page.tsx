"use client";
import { Product } from "@/types/index";
import EditProductForm from "@/Forms/EditProductForm";
import { db } from "@/Firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { EditProductProvider } from "@/Context/ProductDataContext";

const Page = () => {
  const params = useParams();
  const productId: string = params?.id;
  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      const productDocRef = doc(db, "Products", productId);
      const product = await getDoc(productDocRef);

      if (product.exists()) {
        setProductData(product.data() as Product);
      }
    };
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  if (!productData) {
    return <div className="text-colorOne">Loading Product Data ...</div>;
  }

  return (
    <main className=" col-span-4 row-span-4 w-full ">
      <h1 className="text-colorOne w-full flex justify-center text-xl font-sans font-semibold py-5">
        Edit Product
      </h1>
      <EditProductProvider>
        <EditProductForm ProductData={productData} productId={productId} />
      </EditProductProvider>
    </main>
  );
};

export default Page;
