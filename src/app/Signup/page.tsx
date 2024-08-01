import Link from "next/link";
import React from "react";
import PrimaryButton from "@/UI/PrimaryButton";

const page = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl font-bold">
                <span className="text-colorOne">Welcome </span>, New User Choose One
            </h1>

            <Link href="Signup/CustomerSignup">
                <PrimaryButton value="SignUp As a Customer" logo={``} />
            </Link>

            <Link href="/BecomeSeller">
                <PrimaryButton value="SignUp As a Seller" logo={``} />
            </Link>
        </div>
    );
};

export default page;
