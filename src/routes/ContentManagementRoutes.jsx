import { Navigate, Outlet, Route, Routes } from "react-router";
import RouteWrapper from "./RouteWrapper";
import Events from "../pages/ContentManagement/Events";

const ContentManagementRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="events" replace />} />
      <Route
        element={
          <RouteWrapper>
            <Outlet />
          </RouteWrapper>
        }
      >
        <Route path="events" element={<Events />} />
      </Route>
    </Routes>
  );
};
export default ContentManagementRoutes;
