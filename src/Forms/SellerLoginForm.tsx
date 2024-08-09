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

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/Firebase/FirebaseConfig";
import { Seller } from "@/types"; 
import PrimaryButton from "../UI/PrimaryButton";
import Link from "next/link";

const SellerLoginForm = () => {
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

            const docRef = doc(db, "SellerData", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const SellerData = docSnap.data() as Seller;
                localStorage.setItem("User", JSON.stringify(SellerData));
                toast.success("Logged in successfully!");
                window.location.href = "/SellerDashboard";
            } else {
                throw new Error("No such document!");
            }
        } catch (error) {
            console.error("Error logging in or fetching seller data: ", error);
            toast.error("Error: " + error);
        }
    };

    return (
        <div className=" h-screen flex items-center justify-center">
            <div className="w-96 p-6 bg-white rounded-lg shadow-md">
                <div className=" flex flex-col items-center space-y-6">
                    <div className="text-2xl font-bold text-center ">
                        Login as a <span className="text-colorOne">Seller</span>
                    </div>

                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    />

                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    />

                    <PrimaryButton
                        value="Login with Email"
                        className="w-full"
                        onClickFunc={handleEmailLogin}
                    />

                    <Link
                        href={"/BecomeSeller"}
                        className="w-full underline pt-2  h-fit text-colorTwo"
                    >
                        Not a Seller? Become One
                    </Link>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default SellerLoginForm;
