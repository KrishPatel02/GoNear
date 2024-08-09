/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useUserData } from "@/Context/UserDataContext";

import Link from "next/link";
import Avatar from "@mui/material/Avatar";

import { usePathname } from "next/navigation";
import SellerNavigation from "@/Navigations/SellerNavigation";

const SellerDashboardBox = () => {
    const { state } = useUserData();
    const { customer, seller, error, loading } = state;
    const pathname = usePathname();

    if (error) {
        console.log(error);
    }
    if (loading) {
        return <>Loading...</>;
    }

    const user = seller || customer;

    const sdLinksClassName =
        "flex items-center px-4 py-2 gap-2 transition-colors duration-200 border-b-2";

    const unActivePathClassNameSD =
        "text-gray-600 hover:text-black hover:font-medium";
    const activePathClassNameSD =
        "text-colorOne font-medium bg-colorFour rounded";
    return (
        <>
            <div className="row-span-1 row-start-1 h-full flex justify-center items-end pb-2 w-full">
                <h2 className="font-medium text-gray-900">
                    Seller Dashboard
                </h2>
            </div>
            <aside className="row-span-4 col-start-1 w-full h-full">
                <nav className="p-8">
                    {SellerNavigation.map((items) => (
                        <Link
                            key={items.title}
                            href={items.href}
                            className={`${sdLinksClassName} ${pathname === `${items.href}`
                                ? `${activePathClassNameSD}`
                                : ` ${unActivePathClassNameSD}`
                                }`}
                        >
                            {pathname === items.href ? items.activeIcon : items.icon}
                            <span className="">{items.title}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
            <div className="col-span-4 row-start-1 w-full h-full  flex justify-between pb-2 pr-10 pl-10 items-end">
                <div>
                    <h1 className="text-xl text-gray-900">
                        Welcome Back,{"  "}
                        <b>{user?.FullName}</b>
                    </h1>
                </div>
                <div>
                    <Avatar src={user?.PhotoUrl} className="z-10">K</Avatar>
                </div>
            </div>
        </>
    );
};

export default SellerDashboardBox;
