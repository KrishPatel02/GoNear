const iconClassName = "h-5 w-5 cursor-pointer";

import { HiOutlineUser, HiUser } from "react-icons/hi2";
import { MdOutlineAnalytics, MdAnalytics } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { RiListSettingsFill, RiListSettingsLine } from "react-icons/ri";
import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { PiCirclesThreePlus, PiCirclesThreePlusFill } from "react-icons/pi";

const SellerNavigation = [
  {
    title: "Profile Details",
    href: "/SellerDashboard/MyProfile",
    activeIcon: <HiUser className={iconClassName} />,
    icon: <HiOutlineUser className={iconClassName} />,
  },
  {
    title: "Edit Profile",
    href: "/SellerDashboard/MyProfile/EditProfile",
    activeIcon: <FaUserEdit className={iconClassName} />,
    icon: <TbUserEdit className={iconClassName} />,
  },

  {
    title: "Products",
    href: "/SellerDashboard/Products",
    activeIcon: <AiFillProduct className={iconClassName} />,
    icon: <AiOutlineProduct className={iconClassName} />,
  },
  {
    title: "Add Product",
    href: "/SellerDashboard/Products/AddProduct",
    activeIcon: <PiCirclesThreePlusFill className={iconClassName} />,
    icon: <PiCirclesThreePlus className={iconClassName} />,
  },
  {
    title: "Manage Products",
    href: "/SellerDashboard/Products/ManageProducts",
    activeIcon: <RiListSettingsFill className={iconClassName} />,
    icon: <RiListSettingsLine className={iconClassName} />,
  },

  {
    title: "Analytics",
    href: "/SellerDashboard/Analytics",
    activeIcon: <MdAnalytics className={iconClassName} />,
    icon: <MdOutlineAnalytics className={iconClassName} />,
  },

  {
    title: "Setting",
    href: "/SellerDashboard/Setting",
    activeIcon: <IoSettings className={iconClassName} />,
    icon: <IoSettingsOutline className={iconClassName} />,
  },
];

export default SellerNavigation;
