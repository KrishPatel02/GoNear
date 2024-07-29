// "use client";

// import { useEffect } from "react";

// import { auth, db, GoogleAuthProvider } from "../Firebase/FirebaseConfig";

// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
// } from "firebase/auth";

// import { ToastContainer, toast } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";

// import "firebaseui/dist/firebaseui.css";

// import { FcGoogle } from "react-icons/fc";

// import Link from "next/link";
// import PrimaryButton from "./PrimaryButton";

// const FirebaseLogin = () => {
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         window.location.href = "/";
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleEmailLogin = async () => {
//     const email = (document.getElementById("email") as HTMLInputElement).value;

//     const password = (document.getElementById("password") as HTMLInputElement)
//       .value;

//     try {
//       signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           const user = userCredential?.user;

//           console.log(user);

//           localStorage.setItem("User", JSON.stringify(user));

//           toast.success("Logged in succesfull");

//           window.location.href = "/";
//         })

//         .catch((error) => {
//           const errorCode = error.code;

//           const errorMessage = error.message;

//           toast.error(errorCode, errorMessage);
//         });
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, new GoogleAuthProvider());

//       console.log(result.user.uid);

//       const userObject = {
//         name: result.user.displayName || "",
//         email: result.user.email || "",
//         uid: result.user.uid || "",
//       };

//       const userWithId = { ...userObject };

//       localStorage.setItem("User", JSON.stringify(userWithId));

//       toast.success("Logged in successfully");

//       window.location.href = "/";
//     } catch (error) {
//       console.error("Error signing in with Google", error);

//       toast.error("Failed to log in with Google");
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//         <div className="bg-white p-8 rounded shadow-lg w-96">
//           <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

//           <div className="mb-4">
//             <input
//               type="email"
//               id="email"
//               placeholder="Email"
//               className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
//             />
//           </div>

//           {/* <div className="mb-6">
//             <input
//               type="password"
//               id="password"
//               placeholder="Password"
//               className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
//             />
//           </div>

//           <button
//             onClick={handleEmailLogin}
//             className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-900 transition-colors duration-200 shadow-md"
//           >
//             Login with Email
//           </button>

//           <button
//             onClick={handleGoogleLogin}
//             className=" w-full py-2 rounded mt-4 transition-colors duration-200 shadow-md"
//           >
//             <FcGoogle className="inline-block ml-2" /> Login with Google{" "}
//           </button>

//           <Link className="text-blue-400 underline mt-5" href="/Signup">
//             Or Signup
//           </Link>

//           <ToastContainer /> */}


//           <div className="mb-6">
//             <input
//               type="password"
//               id="password"
//               placeholder="Password"
//               className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
//             />
//           </div>

//           <PrimaryButton
//             value="Login with Email"
//             className="w-full py-2 mt-4 text-white bg-colorOne"
//             onClickFunc={handleEmailLogin}
//           />
//           <PrimaryButton
//             value="Login with Google"
//             logo={<FcGoogle className="h-5 w-5 cursor-pointer" />}
//             className="w-full py-2 bg-colorThree mt-4 "
//             onClickFunc={handleGoogleLogin}
//           />
//           <div className="inline-flex items-center justify-center w-full">
//             <hr className="w-64 h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
//             <span className="absolute px-2 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 ">
//               or
//             </span>
//           </div>
//           <Link className="text-blue-400 underline mt-5" href="/Signup">
//             <PrimaryButton
//               value="or Sign Up"
//               className="w-full py-2 bg-colorThree mt-4"
//             />
//           </Link>

//           <ToastContainer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default FirebaseLogin;


"use client";
import React, { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

import { doc, getDoc } from "firebase/firestore";
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
                window.location.href = "/CustomerDashboard";
            } else {
                throw new Error("No such document!");
            }
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
