import type { Metadata } from "next";
import CustomerDashboardBox from "@/Components/CustomerDashboardBox";

export const metadata: Metadata = {
  title: "Customer Dashboard",

  description: "Customer Dashboard Layout",
};

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-flow-row-dense grid-cols-5 grid-rows-5 place-items-center  bg-white h-screen w-screen">
      <CustomerDashboardBox />

      <div className="col-span-4 row-span-4 w-full h-full p-16 rounded border-l border-t ">
        {children}
      </div>
    </div>
  );
}
