import Link from "next/link";
import React from "react";

const page = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl font-bold">
                <span className="text-colorOne">Welcome Back</span>
            </h1>

            <Link
                className="bg-colorOne hover:shadow-xl text-white px-5 py-2 rounded-lg text-xl text-bold"
                href={"Login/CustomerLogin"}
            >
                Login As a Customer
            </Link>
            <Link
                className="bg-transparent shadow-lg hover:shadow-xl  px-5 py-2 rounded-lg text-xl text-bold"
                href={"Login/SellerLogin"}
            >
                Login As a Seller
            </Link>
        </div>
    );
};

export default page;
