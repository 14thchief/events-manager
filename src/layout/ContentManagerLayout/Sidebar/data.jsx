import listIcon from "../../../assets/svg/list-icon.svg";
import discountIcon from "../../../assets/svg/discount-icon.svg";
import ImageIcon from "../../../components/Icon";
import { RiContactsLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { MdOutlinePayments } from "react-icons/md";
import { TbUserShield } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { GrUserSettings } from "react-icons/gr";

export const sidebarData = {
  topRoutes: [
    {
      title: "Dashboard",
      icon: <RxDashboard size={18} />,
      path: "/cms/dashboard",
      access: "*",
      permissionName: "dashboard",
    },
    {
      title: "Event",
      icon: <ImageIcon imageSrc={listIcon} size={24} />,
      path: "/cms/events",
      access: "*",
      permissionName: "events",
    },
    {
      title: "Contact",
      icon: <CiUser size={20} />,
      path: "/cms/contacts",
      access: "*",
      permissionName: "contacts",
    },
    {
      title: "Leads",
      icon: <RiContactsLine size={18} />,
      path: "/cms/leads",
      access: "*",
      permissionName: "leads",
    },
    {
      title: "Discount",
      icon: <ImageIcon imageSrc={discountIcon} size={18} />,
      path: "/cms/discount",
      access: "*",
      permissionName: "discount",
    },
    {
      title: "Agents",
      icon: <TbUserShield size={24} />,
      path: "/cms/agents",
      access: "*",
      permissionName: "users",
    },
    {
      title: "Users",
      icon: <GrUserSettings size={20} />,
      path: "/cms/users",
      access: "*",
      permissionName: "users",
    },
    {
      title: "Payments",
      icon: <MdOutlinePayments size={20} />,
      path: "/cms/payments",
      access: "*",
      permissionName: "payments",
    },
  ],
  bottomRoutes: [],
};
