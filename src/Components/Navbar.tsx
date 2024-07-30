"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../UI/PrimaryButton";
import { usePathname } from "next/navigation";
import { useUserData } from "@/Context/UserDataContext";
import { Customer, Seller } from "@/types";
import { NavBarHemburgMenuCustomerAPI, NavBarHemburgMenuSellerAPI } from "@/API/AllPagesAPI";

const NavBar = () => {
    const pathname = usePathname();

    const [loggedInUser, setLoggedInUser] = useState<Customer | Seller>(null);

    const [menuOpen, setMenuOpen] = useState(false);

    const { state } = useUserData();
    // console.log(state)
    useEffect(() => {
        if (state.customer) {
            setLoggedInUser(state.customer);
        } else if (state.seller) {
            setLoggedInUser(state.seller);
        }
    }, [state]);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const setFalse = () => {
        setMenuOpen(false);
    };

    const handleSetUserNull = () => {
        setLoggedInUser(null);
        localStorage.removeItem("User");
        setFalse();
    };

    console.log("loggedInUser", loggedInUser)

    const navBarLinksClassName =
        "flex items-center px-4 py-2 gap-2 transition-colors duration-200 ";

    const activePathClassNameHemBurg =
        " font-medium text-white bg-colorOne rounded-lg ";
    const unActivePathClassNameHemBurg =
        " hover:text-colorOne hover:font-medium";
    const activePathClassNameNavBar = "text-colorOne font-medium";
    if (state.loading) {
        return <>Loading...</>;
    }
    if (state.error) {
        console.log(state.error);
    }
    return (
        <nav className="p-3 z-50 w-screen bg-white flex justify-between items-center fixed ">
            <Link
                onClick={setFalse}
                href="/"
                className="text-2xl font-bold w-full text-colorOne"
            >
                <span className="text-black">
                    Go
                </span>
                Near
            </Link>

            <div className="categories flex items-center justify-center gap-7 w-full">

                {!state.seller &&
                    <Link
                        href="/BecomeSeller"
                        onClick={setFalse}
                        className={`${navBarLinksClassName} ${pathname === "/BecomeSeller"
                            ? `${activePathClassNameNavBar}`
                            : ` ${unActivePathClassNameHemBurg}`
                            }`}
                    >

                        Become a Seller
                    </Link>
                }
            </div>

            <div className="flex items-center w-full justify-end">
                {loggedInUser && (
                    <div className="relative flex  items-center ">
                        <PrimaryButton
                            value={` Hy, ${loggedInUser?.FullName.split(" ")[0]}`}
                            logo={``}
                            className={` flex align-middle p-2 text-white  ${menuOpen ? "bg-colorOne " : "bg-colorOne "
                                }`}
                            onClickFunc={handleMenuToggle}
                        />

                        {menuOpen && (
                            <div className="absolute top-10 right-0 mt-2 w-60 p-2 bg-transparent rounded-lg shadow-xl z-10">
                                {/* If user is Customer then Show Customer routes */}
                                {state.customer &&
                                    (NavBarHemburgMenuCustomerAPI.map((item) => {
                                        return (
                                            <Link
                                                onClick={handleMenuToggle}
                                                href={item.href}
                                                className={` ${navBarLinksClassName}   ${pathname === item.href
                                                    ? `${activePathClassNameHemBurg}`
                                                    : ` ${unActivePathClassNameHemBurg}`
                                                    }`}
                                                key={item.href}
                                            >
                                                {item.icon}

                                                {item.title}
                                            </Link>
                                        );
                                    })
                                    )
                                }
                                {/* If user is Seller then Show Seller Routes */}
                                {state.seller &&
                                    (NavBarHemburgMenuSellerAPI.map((item) => {
                                        return (
                                            <Link
                                                onClick={handleMenuToggle}
                                                href={item.href}
                                                className={` ${navBarLinksClassName}   ${pathname === item.href
                                                    ? `${activePathClassNameHemBurg}`
                                                    : ` ${unActivePathClassNameHemBurg}`
                                                    }`}
                                                key={item.href}
                                            >
                                                {item.icon}

                                                {item.title}
                                            </Link>
                                        );
                                    })
                                    )
                                }

                                <Link
                                    href="/Logout"
                                    onClick={handleSetUserNull}
                                    className="text-red-500 item-center transition-colors duration-200 px-4 py-2 rounded-lg flex gap-2 hover:text-red-600 hover:font-medium"
                                >

                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {!loggedInUser && (
                    <Link href="/Login">
                        <PrimaryButton
                            value="Login"
                            logo={``}
                            className=" py-2 bg-colorThree mt-4 "
                        />
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
