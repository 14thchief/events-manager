import { Navigate, Outlet, Route, Routes } from "react-router";
import RouteWrapper from "./RouteWrapper";
import Events from "../pages/ContentManagement/Events";
import EventDetails from "../pages/ContentManagement/Events/EventDetail";
import EventForm from "../pages/ContentManagement/Events/EventForm";
import Discounts from "../pages/ContentManagement/Discounts";
import DiscountForm from "../pages/ContentManagement/Discounts/DiscountForm";

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
        {/* EVENT ROUTES */}
        <Route path="events" element={<Events />} />
        <Route path="events/create" element={<EventForm />} />
        <Route path="events/edit" element={<EventForm />} />
        <Route path="events/:event" element={<EventDetails />} />

        {/* COUPON ROUTES */}
        <Route path="discount" element={<Discounts />} />
        <Route path="discount/create" element={<DiscountForm />} />
        <Route path="discount/edit" element={<DiscountForm />} />
      </Route>
    </Routes>
  );
};
export default ContentManagementRoutes;
