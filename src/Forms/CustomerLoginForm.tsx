"use client";
import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/Firebase/FirebaseConfig";
import { Customer } from "@/types";
import Link from "next/link";
import PrimaryButton from "@/UI/PrimaryButton";
import SecondaryButton from "@/UI/SecondayButton";

const CustomerLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = doc(db, "CustomerData", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const customerData = docSnap.data() as Customer;
        localStorage.setItem("User", JSON.stringify(customerData));
        toast.success("Logged in successfully!");
        window.location.href = "/CustomerDashboard";
      } else {
        throw new Error("No such document!");
      }
    } catch (error) {
      console.error("Error logging in or fetching customer data: ", error);
      toast.error("Error: " + error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const userData = userCredential.user;

      const docRef = doc(db, "CustomerData", userData.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const customerData = docSnap.data() as Customer;
        localStorage.setItem("User", JSON.stringify(customerData));
        toast.success("Logged in successfully!");
      } else {
        //Document not exist
        const customerData = {
          FullName: userData.displayName || "",
          Email: userData.email || "",
          Address: "",
          PinCode: "",
          DateOfBirth: "",
          City: "",
          State: "",
          Country: "",
          Phone: "",
          PhotoUrl: userData.photoURL || "",
          uid: userData.uid,
        };
        await setDoc(docRef, customerData);
      }
      window.location.href = "/CustomerDashboard";
    } catch (error) {
      console.error(
        "Error logging in with Google or fetching customer data: ",
        error
      );
      toast.error("Error: " + error);
    }
  };

  return (
    <>
      <div className=" h-screen flex items-center justify-center">
        <div className="w-96 p-6 bg-white rounded-lg shadow-md">
          <div className=" flex flex-col items-center space-y-6">
            <div className="text-2xl font-bold text-center ">
              Login as a <span className="text-colorOne">Customer</span>
            </div>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />

            <PrimaryButton
              value="Login with Email"
              className="w-full "
              onClickFunc={handleEmailLogin}
            />

            <SecondaryButton
              value="Login with Google"
              icon={<FcGoogle className="h-5 w-5 mr-2" />}
              className="w-full "
              onClickFunc={handleGoogleLogin}
            />

            <Link href="/Signup" className="text-blue-500 underline">
              Not A User? SignUp
            </Link>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default CustomerLoginForm;
