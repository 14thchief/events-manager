import { Navigate, Outlet, useLocation } from "react-router";
import { sidebarData } from "../layout/ContentManagerLayout/Sidebar/data";

const ProtectedRoutes = () => {
  const location = useLocation();

  const currentPath = location.pathname;
  const isLoggedIn = true || !!localStorage.getItem("token");

  const pathAccess = sidebarData.topRoutes
    .concat(sidebarData.bottomRoutes)
    .find((x) => currentPath.includes(x.path))?.access;

  const permitted = pathAccess === "*";

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/login"} state={{ from: currentPath }} replace />
  );
};

export default ProtectedRoutes;
