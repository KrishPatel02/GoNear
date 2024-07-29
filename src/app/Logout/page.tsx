"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerData } from "@/Context/UserDataContext";

const LogoutPage = () => {
  const router = useRouter();
  const { logoutUser } = useCustomerData();

  useEffect(() => {
    const logout = async () => {
      await logoutUser();
      router.push("/Login");
    };
    logout();
  }, [logoutUser, router]);

  return <>Loading...</>;
};

export default LogoutPage;
