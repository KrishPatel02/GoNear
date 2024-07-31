"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/Firebase/FirebaseConfig";
import { Seller } from "@/types";
import { useAuthState } from "react-firebase-hooks/auth";

const Page: React.FC = () => {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, loadingUser] = useAuthState(auth);

  useEffect(() => {
    const fetchSeller = async () => {
      if (user) {
        try {
          console.log("Fetching data for user UID:", user.uid);
          const customerDoc = await getDoc(doc(db, "SellerData", user.uid));
          if (customerDoc.exists()) {
            setSeller({ ...customerDoc.data(), uid: user.uid } as Seller);
            console.log("Seller data fetched:", customerDoc.data());
          } else {
            setError("Seller data not found");
            console.log("Seller data not found for UID:", user.uid);
          }
        } catch (err) {
          setError("Failed to fetch seller data");
          console.error("Error fetching seller data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setError("No seller is logged in");
        setLoading(false);
        console.log("No seller is logged in");
      }
    };

    if (!loadingUser) {
      fetchSeller();
    }
  }, [user, loadingUser]);

  if (loading || loadingUser) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-8 mt-24">
      <h1 className="text-4xl font-bold mb-8 flex justify-center">
        Seller Profile
      </h1>
      {seller ? (
        <div className="p-4 border flex gap-10 w-[40%] mx-auto rounded-md shadow-md mb-4">
          <div className="">
            {seller.PhotoUrl ? (
              <img
                src={seller.PhotoUrl}
                alt={`${seller.FullName}'s photo`}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <img
                src="/path/to/placeholder-image.jpg"
                alt="Default profile"
                className="w-20 h-20 rounded-full"
              />
            )}
          </div>
          <div className="">
            <h2 className="text-xl font-bold">{seller.FullName}</h2>
            <p>Email: {seller.SellerEmail}</p>
            <p>ShopName: {seller.ShopName}</p>
            <p>ShopAddress: {seller.ShopAddress}</p>
            <p>GSTNO: {seller.GSTNO}</p>
            <p>Phone: {seller.Phone}</p>
            <p>Date of Birth: {seller.DateOfBirth}</p>
            <p>City: {seller.City}</p>
            <p>State: {seller.State}</p>
            <p>Country: {seller.Country}</p>
            <p>Pin Code: {seller.PinCode}</p>
          </div>
        </div>
      ) : (
        <p>No customer data available</p>
      )}
    </div>
  );
};

export default Page;
