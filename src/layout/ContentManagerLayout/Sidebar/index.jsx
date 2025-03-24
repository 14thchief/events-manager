import styles from "./_styles.module.scss";
import { Link, useLocation, useNavigate } from "react-router";
import { sidebarData } from "./data";
import { useEffect } from "react";
import { BiX } from "react-icons/bi";
import useGetWindowDimension from "../../../hooks/useGetWindowDimension";
import { Logout, Settings } from "../../../assets/icons/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/util/logoutSlice";
import usePersistentAuth from "../../../hooks/usePersistentAuth";
import { openActionModal } from "../../../redux/features/util/actionModalSlice";
import logo from "../../../assets/svg/aplbc_logo.svg";
import { BsGlobe } from "react-icons/bs";
import placeholderDP from "../../../assets/images/placeholder_profile.png";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { sessionUser } = usePersistentAuth();
  const { isMobile } = useGetWindowDimension();
  const isActive = (path) => location.pathname.includes(path);

  useEffect(() => {
    const last_path = sessionStorage.getItem("last_path");
    last_path && navigate(last_path);
  }, []);

  const permittedSidebarRoutes = sidebarData.topRoutes
    .map((x) => ({
      ...x,
      permissions: [],
    }))
    .filter((s) => s.access === "*");

  const handleClickPath = (path) => {
    navigate(path);
    sessionStorage.setItem("last_path", path);
    props.setOpen(false);
  };

  const handleLogout = () => {
    dispatch(
      openActionModal({
        title: "Confirm Logout",
        isOpen: true,
        type: "warning",
        content: `Are you sure you want to Logout of this session?`,
        callback: () => {
          dispatch(logout());
          navigate("/auth/cms");
        },
        callbackText: "Logout",
        cancelText: "Cancel",
      })
    );
  };

  return (
    <div
      className={`${
        isMobile && props.open ? styles.mobileSidebarContainer : ""
      }`}
    >
      <div
        className={`shadow-lg ${styles.sidebar} ${
          !isMobile ? "" : props.open ? styles.open : styles.closed
        }`}
      >
        <div className={styles.routes}>
          <div className={`${styles.logoContainer} pr-2`}>
            <div className={styles.logo}>
              <Link to="/web-portal">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            {isMobile && (
              <button
                className="bg-primary text-white shadow-xl rounded-full h-8 w-8 p-0 flex items-center justify-center"
                onClick={() => props.setOpen((prev) => !prev)}
              >
                <BiX size={32} />
              </button>
            )}
          </div>
          <div className="space-y-4 mt-2 mb-4 xl:mb-8 pl-[1rem]">
            <h1 className="text-[20px] text-white">APLBC CMS PORTAL</h1>

            <button
              onClick={() => navigate("/web-portal")}
              className="flex items-center justify-center gap-4 w-[157px] h-[36px] py-2 px-4 rounded bg-white text-black font-[400]"
            >
              <BsGlobe size={20} />
              Visit site
            </button>
          </div>

          <ul className={styles.sidebar_routes}>
            {permittedSidebarRoutes.map(
              ({ title, icon, path }, index) =>
                title && (
                  <li
                    key={index}
                    className={isActive(path) ? styles.active : ""}
                    onClick={() => handleClickPath(path)}
                  >
                    <span>{icon}</span> {title}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className={`shadow-2xl shadow-black w-full`}>
          <div className={`p-2 pb-6 flex flex-col gap-2`}>
            <div className={`flex items-center gap-4 text-white`}>
              <div className="w-[78px] h-[78px] rounded-full overflow-hidden flex items-center justify-center">
                <img src={placeholderDP} alt={"profile"} />
              </div>
              <div className={`flex flex-col`}>
                <p className={`text-[20px]`}>{sessionUser?.full_name ?? ""}</p>
                <p className={`text-[12px] font-[300]`}>
                  {sessionUser?.email ?? ""}
                </p>
              </div>
            </div>

            <div
              onClick={() => null}
              className="flex items-center gap-4 text-white text-[16px] p-2 max-w-max cursor-pointer"
            >
              <Settings size={20} className={styles.logout} />
              Settings
            </div>

            <div
              className="flex items-center gap-4 text-white text-[16px] p-2 max-w-max cursor-pointer"
              onClick={handleLogout}
            >
              <Logout size={20} className={styles.logout} />
              Logout
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.obfuscator}
        onClick={() => props.setOpen((prev) => !prev)}
      ></div>
    </div>
  );
};
export default Sidebar;
