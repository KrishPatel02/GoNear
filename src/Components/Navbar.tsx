"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import PrimaryButton from "../UI/PrimaryButton";
import { usePathname } from "next/navigation";
import { useUserData } from "@/Context/UserDataContext";
import { Customer, Seller } from "@/types";
import { CircularProgress, Typography, TextField, Button } from "@mui/material";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import CustomerNavigation from "@/Navigations/CustomerNavigation";
import SellerNavigation from "@/Navigations/SellerNavigation";

import { useFetchProducts } from "@/Context/ProductDataContext";
import SecondaryButton from "@/UI/SecondayButton";
import PrimaryIconButton from "@/UI/PrimaryIconButton";

const NavBar = () => {
  const pathname = usePathname();

  const [loggedInUser, setLoggedInUser] = useState<Customer | Seller>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const { state: userState } = useUserData();
  const { state: productState, fetchProducts } = useFetchProducts();
  const { products, loading, error } = productState;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (userState.customer) {
      setLoggedInUser(userState.customer);
    } else if (userState.seller) {
      setLoggedInUser(userState.seller);
    }
  }, [userState]);

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

  useEffect(() => {
    if (products) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.productName.toLowerCase().includes(lowercasedTerm) ||
          product.category.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    if (selectedOption) {
      router.push(`/Search?term=${encodeURIComponent(selectedOption)}`);
      setSearchTerm("");
    }
  }, [selectedOption, router]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleSearch = useCallback(() => {
    if (searchTerm) {
      router.push(`/Search?term=${encodeURIComponent(searchTerm)}`);
    }
  }, [router, searchTerm]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const categoriesAndNames = [
    ...new Set(
      products.flatMap((product) => [product.productName, product.category])
    ),
  ];

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const navBarLinksClassName =
    "flex items-center px-4 py-2 gap-2 transition-colors duration-200 ";

  const activePathClassNameNavBar = "text-colorOne font-medium  ";
  const activePathClassNameHemBurg =
    " font-medium text-colorOne bg-colorFour border-l-2 border-colorOne";
  const unActivePathClassNameHemBurg =
    "text-gray-600 hover:text-black hover:font-medium";
  if (userState.loading) {
    return <>Loading...</>;
  }
  if (userState.error) {
    console.log(userState.error);
  }
  return (
    <nav className=" w-screen p-3 bg-white flex justify-evenly items-center text-center border-b fixed gap-2 z-50">
      <Link
        onClick={setFalse}
        href="/"
        className="text-2xl font-bold w-1/10 text-colorOne"
      >
        <span className="text-black">Go</span>
        Near
      </Link>

      <div className="relative w-1/2 flex items-center rounded bg-colorFour  ">
        <Combobox
          value={selectedOption}
          onChange={setSelectedOption}
          onClose={() => setSearchTerm("")}
        >
          <ComboboxInput
            aria-label="Search"
            displayValue={(option) => option ?? ""}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search by Product Name or Category..."
            className="w-full py-2 px-4 bg-colorFour rounded-lg focus:outline-none active:rounded-t"
          />
          {searchTerm && (
            <ComboboxOptions className="absolute top-10 z-100 w-full overflow-y-scroll hide-scrollbar bg-colorFour rounded-b">
              {categoriesAndNames
                .filter((option) =>
                  option.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((option, index) => (
                  <ComboboxOption
                    key={index}
                    value={option}
                    className="data-[focus]:bg-white text-left data-[focus]:text-colorTwo px-4 py-2 cursor-pointer data-[focus]:border-l-4 border-colorOne"
                  >
                    {option}
                  </ComboboxOption>
                ))}
            </ComboboxOptions>
          )}
        </Combobox>
      </div>

      <div className="categories flex items-center justify-center gap-7 w-1/10">
        {!userState.seller && (
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
        )}
      </div>

      <div className="flex items-center w-1/10 justify-end">
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
              <div className="absolute top-10 right-0 mt-2 w-60 bg-white rounded shadow-md border z-100">
                {userState.customer &&
                  CustomerNavigation.map((item) => {
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
                        {pathname === item.href ? item.activeIcon : item.icon}
                        {item.title}
                      </Link>
                    );
                  })}

                {userState.seller &&
                  SellerNavigation.map((item) => {
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
                        {pathname === item.href ? item.activeIcon : item.icon}

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
          <div className="flex gap-5">
            <Link href="/Login">
              <SecondaryButton value="Login" logo={``} />
            </Link>
            <Link href="/Signup">
              <SecondaryButton value="SignUp" logo={``} />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
