"use client";
import { useUserData } from "@/Context/UserDataContext";
import tailwindConfig from "../../tailwind.config";
const Page = () => {
  const { state } = useUserData()
  console.log(state)
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">GoNear: Go Near By Shops</h1>
      </div>
    </>
  );
};

export default Page;
