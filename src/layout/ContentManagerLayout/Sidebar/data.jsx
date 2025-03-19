import listIcon from "../../../assets/svg/list-icon.svg";
import ImageIcon from "../../../components/Icon";

export const sidebarData = {
  topRoutes: [
    {
      title: "Event Management",
      icon: <ImageIcon imageSrc={listIcon} size={24} />,
      path: "/cms/events",
      access: "*",
      permissionName: "events",
    },
    {
      title: "Coupon Management",
      icon: <ImageIcon imageSrc={listIcon} size={24} />,
      path: "/cms/coupons",
      access: "*",
      permissionName: "coupons",
    },
  ],
  bottomRoutes: [],
};
