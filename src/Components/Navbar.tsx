"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import PrimaryButton from "../UI/PrimaryButton";
import { usePathname } from "next/navigation";
import { useUserData } from "@/Context/UserDataContext";
import { Customer, Seller } from "@/types";
import { CircularProgress, Typography, TextField, Button } from '@mui/material';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';

import CustomerNavigation, { SellerNavigation } from "@/Navigations/CustomerNavigation";
import { useFetchProducts } from "@/Context/ProductDataContext";

const NavBar = () => {
  const pathname = usePathname();

  const [loggedInUser, setLoggedInUser] = useState<Customer | Seller>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const { state: userState } = useUserData();
  const { state: productState, fetchProducts } = useFetchProducts();
  const { products, loading, error } = productState;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
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

  // console.log("loggedInUser", loggedInUser);

  useEffect(() => {
    if (products) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = products.filter(product =>
        product.productName.toLowerCase().includes(lowercasedTerm) ||
        product.category.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    if (selectedOption) {
      router.push(`/Search?term=${encodeURIComponent(selectedOption)}`);
      setSearchTerm('');
    }
  }, [selectedOption, router]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    if (searchTerm) {
      router.push(`/Search?term=${encodeURIComponent(searchTerm)}`);
    }
  }, [router, searchTerm]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const categoriesAndNames = [...new Set(products.flatMap(product => [
    product.productName,
    product.category
  ]))];

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }


  const navBarLinksClassName =
    "flex items-center px-4 py-2 gap-2 transition-colors duration-200 ";

  const activePathClassNameHemBurg =
    " font-medium text-white bg-colorOne rounded-lg ";
  const unActivePathClassNameHemBurg = " hover:text-colorOne hover:font-medium";
  const activePathClassNameNavBar = "text-colorOne font-medium";
  if (userState.loading) {
    return <>Loading...</>;
  }
  if (userState.error) {
    console.log(userState.error);
  }
  return (
    <nav className=" w-screen p-4  flex justify-between items-center text-center fixed gap-2">
      <Link
        onClick={setFalse}
        href="/"
        className="text-2xl font-bold w-1/10 text-colorOne"
      >
        <span className="text-black">Go</span>
        Near
      </Link>

      <div className="flex justify-evenly w-96 mx-auto items-center">
        <Combobox value={selectedOption} onChange={setSelectedOption} onClose={() => setSearchTerm('')}>
          <ComboboxInput
            aria-label="Search"
            displayValue={(option) => option ?? ''}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search by Product Name or Category..."
            className="w-full px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
          />
          {searchTerm && (
            <ComboboxOptions className="absolute top-14 z-[9999999] mt-1 w-96 max-h-32 overflow-y-scroll hide-scrollbar bg-white border border-gray-300 rounded-md shadow-lg">
              {categoriesAndNames
                .filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((option, index) => (
                  <ComboboxOption
                    key={index}
                    value={option}
                    className="data-[focus]:bg-colorOne rounded-md data-[focus]:text-colorFour px-4 py-2 cursor-pointer"
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
              <div className="absolute top-10 right-0 mt-2 w-60 p-2 bg-white rounded-md shadow-xl z-100">
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
                        {item.icon}

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