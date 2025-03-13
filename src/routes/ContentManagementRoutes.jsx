import { Navigate, Outlet, Route, Routes } from "react-router";
import RouteWrapper from "./RouteWrapper";
import Events from "../pages/ContentManagement/Events";
import EventDetails from "../pages/ContentManagement/Events/EventDetail";
import EventForm from "../pages/ContentManagement/Events/EventForm";

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
        <Route path="events/create" element={<EventForm />} />
        <Route path="events/:event" element={<EventDetails />} />
      </Route>
    </Routes>
  );
};
export default ContentManagementRoutes;
