import listIcon from "../../../assets/svg/list-icon.svg";
import discountIcon from "../../../assets/svg/discount-icon.svg";
import ImageIcon from "../../../components/Icon";
import { Analytics, BiUser } from "../../../assets/icons/icons";
import { RiContactsLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { MdOutlinePayments } from "react-icons/md";

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
      icon: <BiUser size={20} />,
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
      icon: <ImageIcon imageSrc={discountIcon} size={20} />,
      path: "/cms/discount",
      access: "*",
      permissionName: "discount",
    },
    {
      title: "Analytics",
      icon: <Analytics size={22} />,
      path: "/cms/analytics",
      access: "*",
      permissionName: "analytics",
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
