import { HiUser, HiOutlineUser } from "react-icons/hi2";
import {
    PiPackageLight,
    PiShoppingCartLight,
    PiPackageFill,
    PiShoppingCartFill,
} from "react-icons/pi";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { TbUserEdit, TbListDetails, TbShoppingBagPlus } from "react-icons/tb";
import { FaUserEdit, FaUser } from "react-icons/fa";
import {
    IoWallet,
    IoWalletOutline,
    IoSettings,
    IoSettingsOutline,
} from "react-icons/io5";
import { FiPackage } from "react-icons/fi";

import { MdAnalytics } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";


const iconClassName = "h-5 w-5 cursor-pointer";

export const NavBarHemburgMenuCustomerAPI = [
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

export const NavBarHemburgMenuSellerAPI = [
    {
        title: "Profile Details",

        href: "/SellerDashboard/MyProfile",

        icon: <FaUser className={iconClassName} />,
    },
    {
        title: "Edit Profile",

        href: "/SellerDashboard/MyProfile/EditProfile",

        icon: <FaUserEdit className={iconClassName} />,
    },

    {
        title: "My Products",

        href: "/SellerDashboard/Products",

        icon: <TbListDetails className={iconClassName} />,
    },
    {
        title: "Add Product",

        href: "/SellerDashboard/Products/AddProduct",

        icon: <TbShoppingBagPlus className={iconClassName} />,
    },

    {
        title: "Analytics",

        href: "/SellerDashboard/Analytics",

        icon: <MdOutlineAnalytics className={iconClassName} />,
    },

    {
        title: "Setting",

        href: "SellerDashboard/Setting",

        icon: <IoSettingsOutline className={iconClassName} />,
    },
];
