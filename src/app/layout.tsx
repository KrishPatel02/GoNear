import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import { UserDataProvider } from "@/Context/UserDataContext";
import { FetchProductsProvider } from "@/Context/ProductDataContext";

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
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} h-full overflow-x-hidden scroll-smooth `}>
        <FetchProductsProvider>
          <UserDataProvider>
            <Navbar />
            {children}
          </UserDataProvider>
        </FetchProductsProvider>
      </body>
    </html>
  );
}
