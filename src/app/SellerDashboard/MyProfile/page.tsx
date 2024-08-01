"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/Firebase/FirebaseConfig";
import { Seller } from "@/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserData } from "@/Context/UserDataContext";
import { SellerDataSequence } from "@/Utils/CustomerDataSequence";

const Page: React.FC = () => {

  const { state } = useUserData();
  console.log("Seller data fetched:", state);
  const seller = state.seller
  if (state.loading) {
    return <p>Loading...</p>;
  }

  if (state.error) {
    return <p className="text-red-500">Error while Displaying Your Data</p>;
  }

  // Sorting the Data to show
  const hiddenKeys = ["uid", "PhotoUrl"];

  const displayedUserData = seller
    ? Object.fromEntries(
      Object.entries(seller)

        .filter(([key]) => !hiddenKeys.includes(key))
        .sort(
          ([a], [b]) =>
            SellerDataSequence.indexOf(a) - SellerDataSequence.indexOf(b)
        )
    )
    : {};

  return (
    <main className="col-span-4 row-span-4 w-full h-full  ">
      {seller ? (
        <>
          <ul className=" border border-gray-300 rounded-lg p-6 shadow-sm">
            {Object.entries(displayedUserData).map(([key, value]) => (
              <li
                key={key}
                className="mb-4 text-lg text-gray-700 border-b border-gray-200 pb-2 last:border-b-0"
              >
                <span className="font-semibold text-gray-900">
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </span>{" "}
                {typeof value === "object" ? JSON.stringify(value) : value}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No Seller data available</p>
      )}
    </main>
  );
};

export default Page;
