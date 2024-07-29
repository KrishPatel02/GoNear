"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { usePathname } from "next/navigation";
import AllPagesAPI from "../API/AllPagesAPI"

const NavBar = () => {
    const pathname = usePathname();

    const [loggedInUser, setLoggedInUser] = useState(null);

    const [menuOpen, setMenuOpen] = useState(false);

    // const { state } = useUserData();
    // const { user } = state;
    useEffect(() => {
        const UserData = localStorage.getItem("User") ?? null;

        if (UserData != null) {
            setLoggedInUser(JSON.parse(UserData));
        }
    }, []);

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

    const navBarLinksClassName =
        "flex items-center px-4 py-2 gap-2 transition-colors duration-200 ";

    const activePathClassNameHemBurg =
        " font-medium text-white bg-colorOne rounded-lg ";
    const unActivePathClassNameHemBurg =
        " hover:text-colorOne hover:font-medium";
    const activePathClassNameNavBar = "text-colorOne font-medium";
    // if (state.loading) {
    //     return <>Loading...</>;
    // }
    // if (state.error) {
    //     console.log(state.error);
    // }
    return (
        <div className="p-3 w-screen bg-white flex justify-evenly items-center fixed ">
            <Link
                onClick={setFalse}
                href="/"
                className="text-2xl font-bold w-1/10 text-colorOne"
            >
                <span className="text-black">
                    Go
                </span>
                Near
            </Link>

            <div className="categories flex items-center gap-7 w-2/3">
                <div className="relative w-1/2 flex items-evenly rounded-lg bg-colorFour focus:border-gray-500 border-gray-300">
                    <button className=" w-1/12 place-content-center rounded-lg bg-colorFour focus:outline-none">

                    </button>

                    <input
                        type="text"
                        placeholder="Search for products"
                        onClick={setFalse}
                        className="w-full py-2 px-4 bg-colorFour focus:outline-none rounded-lg "
                    />
                </div>

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
            </div>

            <div className="flex items-center w-1/10">
                {loggedInUser && (
                    <div className="relative flex  items-center ">
                        <PrimaryButton
                            value={` Hy, `}
                            logo={``}
                            className={` flex align-middle p-2 text-white  ${menuOpen ? "bg-colorOne " : "bg-colorOne "
                                }`}
                            onClickFunc={handleMenuToggle}
                        />

                        {menuOpen && (
                            <div className="absolute top-10 right-0 mt-2 w-60 p-2 bg-transparent rounded-lg shadow-xl z-10">
                                {AllPagesAPI.map((item) => {
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
                                })}

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
        </div>
    );
};

export default NavBar;
