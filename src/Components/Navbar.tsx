"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../UI/PrimaryButton";
import { usePathname } from "next/navigation";
import { useUserData } from "@/Context/UserDataContext";
import { Customer, Seller } from "@/types";
import { FiSearch } from "react-icons/fi";
import CustomerNavigation from "@/Navigations/CustomerNavigation";

const NavBar = () => {
  const pathname = usePathname();

  const [loggedInUser, setLoggedInUser] = useState<Customer | Seller>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const { state } = useUserData();

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

  console.log("loggedInUser", loggedInUser);

  const navBarLinksClassName =
    "flex items-center px-4 py-2 gap-2 transition-colors duration-200 ";

  const activePathClassNameHemBurg =
    " font-medium text-white bg-colorOne rounded-lg ";
  const unActivePathClassNameHemBurg = " hover:text-colorOne hover:font-medium";
  const activePathClassNameNavBar = "text-colorOne font-medium";
  if (state.loading) {
    return <>Loading...</>;
  }
  if (state.error) {
    console.log(state.error);
  }
  return (
    <nav className=" w-screen p-3 bg-white flex justify-evenly items-center text-center fixed gap-2">
      <Link
        onClick={setFalse}
        href="/"
        className="text-2xl font-bold w-1/10 text-colorOne"
      >
        <span className="text-black">Go</span>
        Near
      </Link>
      <div className="relative w-1/2 flex items-evenly rounded-lg bg-colorFour focus:border-gray-500 border-gray-300">
        <button className=" w-1/12 place-content-center rounded-lg bg-colorFour focus:outline-none">
          <FiSearch className="h-5 w-5" />
        </button>

        <input
          type="text"
          placeholder="Search for products"
          onClick={setFalse}
          className="w-full py-2 px-4 bg-colorFour focus:outline-none rounded-lg "
        />
      </div>
      <div className="categories flex items-center justify-center gap-7 w-1/10">
        {!state.seller && (
          <Link
            href="/BecomeSeller"
            onClick={setFalse}
            className={`${navBarLinksClassName} ${
              pathname === "/BecomeSeller"
                ? `${activePathClassNameNavBar}`
                : ` ${unActivePathClassNameHemBurg}`
            }`}
          >
            Become a Seller
          </Link>
        )}
      </div>

      <div className="flex items-center w-1/10 justify-end">
        {loggedInUser && (
          <div className="relative flex  items-center ">
            <PrimaryButton
              value={` Hy, ${loggedInUser?.FullName.split(" ")[0]}`}
              logo={``}
              className={` flex align-middle p-2 text-white  ${
                menuOpen ? "bg-colorOne " : "bg-colorOne "
              }`}
              onClickFunc={handleMenuToggle}
            />

            {menuOpen && (
              <div className="absolute top-10 right-0 mt-2 w-60 p-2 bg-white rounded-md shadow-xl z-50">
                {state.customer &&
                  CustomerNavigation.map((item) => {
                    return (
                      <Link
                        onClick={handleMenuToggle}
                        href={item.href}
                        className={` ${navBarLinksClassName}   ${
                          pathname === item.href
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

                {state.seller &&
                  CustomerNavigation.map((item) => {
                    return (
                      <Link
                        onClick={handleMenuToggle}
                        href={item.href}
                        className={` ${navBarLinksClassName}   ${
                          pathname === item.href
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
            <PrimaryButton value="Login" logo={``} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
