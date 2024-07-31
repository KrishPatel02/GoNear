const iconClassName = "h-5 w-5 cursor-pointer";

import { HiOutlineUser } from "react-icons/hi2";

import { HiUser } from "react-icons/hi2";

import { PiPackageFill } from "react-icons/pi";

import { PiPackageLight } from "react-icons/pi";

import { PiShoppingCartLight } from "react-icons/pi";

import { PiShoppingCartFill } from "react-icons/pi";

import { MdOutlineFavorite } from "react-icons/md";

import { MdOutlineFavoriteBorder } from "react-icons/md";

import { TbUserEdit } from "react-icons/tb";

import { FaUserEdit } from "react-icons/fa";

import { IoWallet } from "react-icons/io5";

import { IoWalletOutline } from "react-icons/io5";

import { IoSettings } from "react-icons/io5";

import { IoSettingsOutline } from "react-icons/io5";

const CustomerNavigation = [
  {
    title: "Profile Details",

    href: "/CustomerDashboard/MyProfile",
    activeIcon: <HiUser className={iconClassName} />,
    icon: <HiOutlineUser className={iconClassName} />,
  },

  {
    title: "My Orders",

    href: "/CustomerDashboard/MyProfile/MyOrders",
    activeIcon: <PiPackageFill className={iconClassName} />,
    icon: <PiPackageLight className={iconClassName} />,
  },

  {
    title: "My Cart",

    href: "/CustomerDashboard/MyProfile/MyCart",
    activeIcon: <PiShoppingCartFill className={iconClassName} />,
    icon: <PiShoppingCartLight className={iconClassName} />,
  },

  {
    title: "Wishlist",

    href: "/CustomerDashboard/MyProfile/Wishlist",
    activeIcon: <MdOutlineFavorite className={iconClassName} />,
    icon: <MdOutlineFavoriteBorder className={iconClassName} />,
  },

  {
    title: "Edit Profile",

    href: "/CustomerDashboard/MyProfile/EditProfile",
    activeIcon: <FaUserEdit className={iconClassName} />,
    icon: <TbUserEdit className={iconClassName} />,
  },
  {
    title: "Wallet",

    href: "/CustomerDashboard/MyProfile/Wallet",
    activeIcon: <IoWallet className={iconClassName} />,
    icon: <IoWalletOutline className={iconClassName} />,
  },

  {
    title: "Setting",

    href: "/CustomerDashboard/Setting",
    activeIcon: <IoSettings className={iconClassName} />,
    icon: <IoSettingsOutline className={iconClassName} />,
  },
];

export default CustomerNavigation;
