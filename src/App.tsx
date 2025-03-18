import { Navigate, Outlet, Route, Routes } from "react-router";
import AuthLayout from "./layout/AuthLayout";
import ContentManagementLayout from "./layout/ContentManagerLayout";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { lazy } from "react";
import RouteWrapper from "./routes/RouteWrapper";
import WebPortalLayout from "./layout/WebPortalLayout";

const App = () => {
  const AuthRoutes = lazy(() => import("./routes/AuthRoutes"));
  const ContentManagementRoutes = lazy(
    () => import("./routes/ContentManagementRoutes")
  );

  return (
    <Routes>
      <Route
        element={
          <RouteWrapper>
            <Outlet />
          </RouteWrapper>
        }
      >
        <Route>
          <Route path="/" element={<Navigate to={"/web-portal"} />} />
        </Route>
        <Route path="/web-portal" element={<WebPortalLayout />} />
        <Route element={<AuthLayout />}>
          <Route path="/auth/*" element={<AuthRoutes />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<ContentManagementLayout />}>
            <Route path="/cms/*" element={<ContentManagementRoutes />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
