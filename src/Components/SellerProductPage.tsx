"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircularProgress, Typography } from "@mui/material";
import { RiListSettingsLine } from "react-icons/ri";
import { PiCirclesThreePlus } from "react-icons/pi";
import ProductCard from "@/UI/ProductCard";
import { auth } from "@/Firebase/FirebaseConfig";
import { useFetchProducts } from "@/Context/ProductDataContext";
import SecondaryButton from "@/UI/SecondayButton";

const SellerProductPage = () => {
  const [sellerID, setSellerID] = useState<string | null>(null);
  const { state, fetchProducts } = useFetchProducts();
  const { products, loading, error } = state;
  const pathname = usePathname();

  useEffect(() => {
    const fetchSellerID = () => {
      const user = auth.currentUser;
      console.log("user from add product form", user);
      if (user) {
        setSellerID(user.uid);
      }
    };

    fetchSellerID();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const userProducts = products?.filter(
    (product) => product.sellerID === sellerID
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <main className="col-span-4 row-span-4 w-full">
        <div className="flex justify-between items-center mb-5">
          <div className="text-2xl font-semibold mb-4 text-gray-800">
            {pathname === "/SellerDashboard/Products/ManageProducts"
              ? `Manage Products`
              : `Products`}
          </div>

          <div className="gap-2 flex">
            <Link href="/SellerDashboard/Products/AddProduct">
              <SecondaryButton
                value="Add Product"
                icon={<PiCirclesThreePlus />}
              />
            </Link>
            <Link href="/SellerDashboard/Products/ManageProducts">
              <SecondaryButton
                value="Manage Products"
                icon={<RiListSettingsLine />}
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 items-center">
          {userProducts?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </>
  );
};

export default SellerProductPage;
