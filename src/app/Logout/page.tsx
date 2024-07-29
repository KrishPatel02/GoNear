"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserData } from "@/Context/UserDataContext";

const LogoutPage = () => {
  const router = useRouter();
  const { logoutUser } = useUserData();

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
