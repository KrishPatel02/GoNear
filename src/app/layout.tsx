import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";

import GlobalLayout from "@/Components/GlobalLayout";

// import {CustomerDataContext} from "@/Context/CustomerDataContext"

import Navbar from "@/Components/Navbar";
import { UserDataProvider } from "@/Context/UserDataContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoNear",

  description: "Go Near By Shops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden scroll-smooth `}>
          <UserDataProvider>
            <GlobalLayout>
              <Navbar />
              {children}
            </GlobalLayout>
          </UserDataProvider>
      </body>
    </html>
  );
}
