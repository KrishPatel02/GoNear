"use client";

import { useEffect } from "react";

import { auth, db, GoogleAuthProvider } from "@/Firebase/FirebaseConfig";

import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "firebaseui/dist/firebaseui.css";

import { FcGoogle } from "react-icons/fc";

import PrimaryButton from "@/Components/PrimaryButton";

import Link from "next/link";

const FirebaseLogin = () => {
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             window.location.href = "/";
    //         }
    //     });

    //     return () => unsubscribe();
    // }, []);

    const handleEmailLogin = async () => {
        const email = (document.getElementById("email") as HTMLInputElement).value;

        const password = (document.getElementById("password") as HTMLInputElement)
            .value;

        try {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential?.user;

                    console.log(user);

                    localStorage.setItem("User", JSON.stringify(user));

                    toast.success("Logged in succesfull");

                    window.location.href = "/";
                })

                .catch((error) => {
                    const errorCode = error.code;

                    const errorMessage = error.message;

                    toast.error(errorCode, errorMessage);
                });
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());

            console.log(result.user.uid);

            const userObject = {
                name: result.user.displayName || "",
                email: result.user.email || "",
                uid: result.user.uid || "",
            };

            const userWithId = { ...userObject };

            localStorage.setItem("User", JSON.stringify(userWithId));

            toast.success("Logged in successfully");

            window.location.href = "/";
        } catch (error) {
            console.error("Error signing in with Google", error);

            toast.error("Failed to log in with Google");
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-lg w-96">
                    <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>

                    <PrimaryButton
                        value="Login with Email"
                        className="w-full py-2 mt-4 text-white bg-colorOne"
                        onClickFunc={handleEmailLogin}
                    />
                    <PrimaryButton
                        value="Login with Google"
                        logo={<FcGoogle className="h-5 w-5 cursor-pointer" />}
                        className="w-full py-2 bg-colorThree mt-4 "
                        onClickFunc={handleGoogleLogin}
                    />
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-64 h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                        <span className="absolute px-2 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 ">
                            or
                        </span>
                    </div>
                    <Link
                        className="text-blue-400 underline mt-5"
                        href="/Signup/CustomerSignup"
                    >
                        <PrimaryButton
                            value="or Sign Up"
                            className="w-full py-2 bg-colorThree mt-4"
                        />
                    </Link>

                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default FirebaseLogin;
