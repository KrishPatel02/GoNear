"use client";
import React, { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/Firebase/FirebaseConfig";
import { Customer } from "@/types"; // Make sure to update your types file to include Customer
import PrimaryButton from "../Components/PrimaryButton";
import Link from "next/link";

const CustomerLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
            console.error("Error logging in with Google or fetching customer data: ", error);
            toast.error("Error: " + error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white p-8 rounded gap-1 flex flex-col shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    />
                </div>

                <PrimaryButton
                    value="Login with Email"
                    className="w-full py-2 mt-4 bg-colorOne text-white"
                    onClickFunc={handleEmailLogin}
                />
                <PrimaryButton
                    value="Login with Google"
                    logo={<FcGoogle className="h-5 w-5 cursor-pointer" />}
                    className="w-full flex justify-center items-center py-2 bg-colorThree mt-4"
                    onClickFunc={handleGoogleLogin}
                />
                <Link
                    href={"/Signup"}
                    className="w-full underline pt-2  h-fit text-colorTwo"
                >
                    Not A User? SignUp
                </Link>
                <ToastContainer />
            </div>
        </div>
    );
};

export default CustomerLoginForm;
