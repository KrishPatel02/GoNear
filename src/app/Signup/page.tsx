import Link from "next/link";
import React from "react";
import PrimaryButton from "@/UI/PrimaryButton";

const page = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold">
        <span className="text-colorOne">Welcome!</span> Choose One to
      </h1>
      <h1 className="text-4xl font-bold">
        Create a <span className="text-colorOne"> New Account</span>
      </h1>

      <Link href="Signup/CustomerSignUp">
        <PrimaryButton value="SignUp as a Customer" logo={``} />
      </Link>

      <Link href="/BecomeSeller">
        <PrimaryButton value="SignUp as a Seller" logo={``} />
      </Link>
    </div>
  );
};

export default page;
