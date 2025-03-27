import events from "../../../assets/svg/sidebar_events.svg";
import discount from "../../../assets/svg/sidebar_discount.svg";
import contacts from "../../../assets/svg/sidebar_contacts.svg";
import users from "../../../assets/svg/sidebar_users.svg";
import agents from "../../../assets/svg/sidebar_agents.svg";
import leads from "../../../assets/svg/sidebar_leads.svg";
import payments from "../../../assets/svg/sidebar_payments.svg";
import ImageIcon from "../../../components/Icon";
import { RxDashboard } from "react-icons/rx";

export const sidebarData = {
  topRoutes: [
    {
      title: "Dashboard",
      icon: <RxDashboard size={18} className="border-2" />,
      path: "/cms/dashboard",
      access: "*",
      permissionName: "dashboard",
    },
    {
      title: "Event",
      icon: <ImageIcon imageSrc={events} size={24} />,
      path: "/cms/events",
      access: "*",
      permissionName: "events",
    },
    {
      title: "Discount",
      icon: <ImageIcon imageSrc={discount} size={18} />,
      path: "/cms/discount",
      access: "*",
      permissionName: "discount",
    },
    {
      title: "Contact",
      icon: <ImageIcon imageSrc={contacts} size={24} />,
      path: "/cms/contacts",
      access: "*",
      permissionName: "contacts",
    },
    {
      title: "Leads",
      icon: <ImageIcon imageSrc={leads} size={24} />,
      path: "/cms/leads",
      access: "*",
      permissionName: "leads",
    },
    {
      title: "Agents",
      icon: <ImageIcon imageSrc={agents} size={24} />,
      path: "/cms/agents",
      access: "*",
      permissionName: "users",
    },
    {
      title: "Users",
      icon: <ImageIcon imageSrc={users} size={24} />,
      path: "/cms/users",
      access: "*",
      permissionName: "users",
    },
    {
      title: "Payments",
      icon: <ImageIcon imageSrc={payments} size={24} />,
      path: "/cms/payments",
      access: "*",
      permissionName: "payments",
    },
  ],
  bottomRoutes: [],
};
