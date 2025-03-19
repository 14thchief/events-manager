import "./styles.scss";
import { Outlet, useLocation, useOutletContext } from "react-router";
import Sidebar from "./Sidebar";
import { BiMenu } from "react-icons/bi";
import { Home } from "../../assets/icons/icons";
import { MdKeyboardArrowRight } from "react-icons/md";
import { capitalize } from "lodash";
import useClickOutside from "../../hooks/useClickOutside";

const ContentManagementLayout = () => {
  const contextValue = useOutletContext();
  const location = useLocation();
  const currentPath = location.pathname?.replace(/%20/g, " ")?.split("/");
  const slicedPath = currentPath?.slice(2, currentPath.length);
  const { open, setOpen, dropdownRef: sidebarRef } = useClickOutside();

  return (
    <div className={"admin_layout"}>
      <Sidebar open={open} setOpen={setOpen} ref={sidebarRef} />
      <main>
        <div className={"navHeader"}>
          <div className={"breadCrumb"}>
            <button className={"mobileToggleButton bg-white"}>
              <BiMenu size={28} onClick={() => setOpen((prev) => !prev)} />
            </button>

            <p>
              <Home size={16} />
              {slicedPath?.map((item, key) => {
                return (
                  <span key={key} className="flex items-center gap-2">
                    {capitalize(item)}
                    {key !== slicedPath?.length - 1 && <MdKeyboardArrowRight />}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
        <div className={`p-4 max-w-full`}>
          <Outlet context={contextValue} />
        </div>
      </main>
    </div>
  );
};

export default ContentManagementLayout;
