import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { FaUser } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";

import { FiPackage } from "react-icons/fi";
import { TbListDetails, TbShoppingBagPlus } from "react-icons/tb";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";

const iconClassName = "h-5 w-5 cursor-pointer";

export const NavBarHemburgMenuCustomerAPI = [
    {
        title: "Profile Details",

        href: "CustomerDashboard/MyProfile",

        icon: <FaUser className={iconClassName} />,
    },

    {
        title: "My Orders",

        href: "/CustomerDashboard/MyProfile/MyOrders",

        icon: <FiPackage className={iconClassName} />,
    },

    {
        title: "My Cart",

        href: "/CustomerDashboard/MyProfile/MyCart",

        icon: <ShoppingCartRoundedIcon className={iconClassName} />,
    },

    {
        title: "Wishlist",

        href: "/CustomerDashboard/MyProfile/Wishlist",

        icon: <FavoriteBorderRoundedIcon className={iconClassName} />,
    },

    {
        title: "Edit Profile",

        href: "CustomerDashboard/MyProfile/EditProfile",

        icon: <FaUserEdit className={iconClassName} />,
    },

    {
        title: "Customer Care",

        href: "/CustomerDashboard/CustomerCare",

        icon: <HeadsetMicRoundedIcon className={iconClassName} />,
    },

    {
        title: "Setting",

        href: "CustomerDashboard/Setting",

        icon: <SettingsOutlinedIcon className={iconClassName} />,
    },
];

export const NavBarHemburgMenuSellerAPI = [
    {
        title: "Profile Details",

        href: "SellerDashboard/MyProfile",

        icon: <FaUser className={iconClassName} />,
    },
    {
        title: "Edit Profile",

        href: "SellerDashboard/MyProfile/EditProfile",

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

        icon: <AnalyticsRoundedIcon className={iconClassName} />,
    },

    {
        title: "Setting",

        href: "SellerDashboard/Setting",

        icon: <SettingsOutlinedIcon className={iconClassName} />,
    },
];
