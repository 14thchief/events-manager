import listIcon from "../../../assets/svg/list-icon.svg";
import discountIcon from "../../../assets/svg/discount-icon.svg";
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
      title: "Discount",
      icon: <ImageIcon imageSrc={discountIcon} size={24} />,
      path: "/cms/coupons",
      access: "*",
      permissionName: "coupons",
    },
  ],
  bottomRoutes: [],
};
