import Link from "next/link";
import React from "react";
import PrimaryButton from "@/UI/PrimaryButton";

const page = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl font-bold">
                <span className="text-colorOne">Welcome Back</span>
            </h1>

            <Link href="Login/CustomerLogin">
                <PrimaryButton value="Login as a Customer" logo={``} />
            </Link>
            <Link href="Login/SellerLogin">
                <PrimaryButton value="Login as a Seller" logo={``} />
            </Link>
        </div>
    );
};

export default page;
