import { Navigate, Outlet, Route, Routes } from "react-router";
import RouteWrapper from "./RouteWrapper";
import Events from "../pages/ContentManagement/Events";
import EventDetails from "../pages/ContentManagement/Events/EventDetail";
import EventForm from "../pages/ContentManagement/Events/EventForm";
import Coupons from "../pages/ContentManagement/Coupons";
import CouponForm from "../pages/ContentManagement/Coupons/CouponForm";

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
        <Route path="coupons" element={<Coupons />} />
        <Route path="coupons/create" element={<CouponForm />} />
        <Route path="coupons/edit" element={<CouponForm />} />
      </Route>
    </Routes>
  );
};
export default ContentManagementRoutes;
