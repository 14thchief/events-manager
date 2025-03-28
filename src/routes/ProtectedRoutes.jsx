import { Navigate, Outlet, useLocation } from "react-router";
import { sidebarData } from "../layout/ContentManagerLayout/Sidebar/data";

const ProtectedRoutes = () => {
  const location = useLocation();

  const currentPath = location.pathname;
  const isLoggedIn = !!sessionStorage.getItem("token");

  const pathAccess = sidebarData.topRoutes
    .concat(sidebarData.bottomRoutes)
    .find((x) => currentPath.includes(x.path))?.access;

  const permitted = pathAccess === "*";

  return isLoggedIn && permitted ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/cms"} state={{ from: currentPath }} replace />
  );
};

export default ProtectedRoutes;
