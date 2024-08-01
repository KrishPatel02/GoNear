"use client";
import React, { useState } from "react";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/Firebase/FirebaseConfig";
import { User } from "@/types";
import PrimaryButton from "../UI/PrimaryButton";
import Link from "next/link";

const CustomerSignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState(""); // New state for First Name
    const [lastName, setLastName] = useState(""); // New state for Last Name

    const handleEmailSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            // Checking whether user Id exist or not
            if (!user.uid) {
                throw new Error("User ID is undefined");
            }
            const userObject: User = {
                FullName: firstName + " " + lastName,
                Email: user.email || "",
                Address: "",
                PinCode: "",
                DateOfBirth: "",
                City: "",
                State: "",
                Country: "",
                Phone: "",
                PhotoUrl: "",
                uid: user.uid,
            };
            const docRef = await setDoc(
                doc(db, "CustomerData", userObject.uid),
                userObject
            );
            console.log("Document written with ID: ", docRef);

            localStorage.setItem("User", JSON.stringify(userObject));
            toast.success("Signed up successfully!");
            window.location.href = "/";
        } catch (error) {
            console.error("Error creating user or adding to Firestore: ", error);
            toast.error("Error: " + error);
        }
    };

    const handleGoogleSignup = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const userData = userCredential.user;

            const userObject: User = {
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
            };

            const docRef = await setDoc(
                doc(db, "CustomerData", userData.uid),
                userObject
            );
            console.log("Document written with ID: ", docRef);

            localStorage.setItem("User", JSON.stringify(userObject));
            toast.success("Signed up successfully!");
            window.location.href = "/";
        } catch (error) {
            console.error(
                "Error signing in with Google or adding to Firestore: ",
                error
            );
            toast.error("Error: " + error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="flex flex-col w-1/4 bg-white p-8 rounded gap-3 shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>

                <div className="mb-4">
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    />
                </div>

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
                    value="Signup with Email"
                    className="w-full"
                    onClickFunc={handleEmailSignup}
                />
                <PrimaryButton
                    value="Signup with Google"
                    logo={<FcGoogle className="h-5 w-5 cursor-pointer" />}
                    className="w-full "
                    onClickFunc={handleGoogleSignup}
                />

                <ToastContainer />
            </div>
        </div>
    );
};

export default CustomerSignUpForm;
