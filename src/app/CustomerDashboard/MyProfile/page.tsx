"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/Firebase/FirebaseConfig";
import { Customer } from "@/types";
import { useAuthState } from "react-firebase-hooks/auth";
import CustomerDataSequence from "@/Utils/CustomerDataSequence";

const Page: React.FC = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const [user, loadingUser] = useAuthState(auth);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (user) {
        try {
          console.log("Fetching data for user UID:", user.uid);

          const customerDoc = await getDoc(doc(db, "CustomerData", user.uid));

          if (customerDoc.exists()) {
            setCustomer({ ...customerDoc.data(), uid: user.uid } as Customer);

            console.log("Customer data fetched:", customerDoc.data());
          } else {
            setError("Customer data not found");

            console.log("Customer data not found for UID:", user.uid);
          }
        } catch (err) {
          setError("Failed to fetch customer data");

          console.error("Error fetching customer data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setError("No user is logged in");

        setLoading(false);

        console.log("No user is logged in");
      }
    };

    if (!loadingUser) {
      fetchCustomer();
    }
  }, [user, loadingUser]);

  if (loading || loadingUser) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const customerDataOrder = CustomerDataSequence;

  const hiddenKeys = ["uid", "PhotoUrl"];

  const displayedUserData = customer
    ? Object.fromEntries(
        Object.entries(customer)

          .filter(([key]) => !hiddenKeys.includes(key))

          .sort(
            ([a], [b]) =>
              customerDataOrder.indexOf(a) - customerDataOrder.indexOf(b)
          )
      )
    : {};

  return (
    <>
      <main className="col-span-4 row-span-4 w-full h-full  ">
        {customer ? (
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
          <p>No customer data available</p>
        )}
      </main>
    </>
  );
};

export default Page;
