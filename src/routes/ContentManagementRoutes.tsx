import { Navigate, Outlet, Route, Routes } from "react-router";
import RouteWrapper from "./RouteWrapper";
import Events from "../pages/ContentManagement/Events";
import EventDetails from "../pages/ContentManagement/Events/EventDetail";
import EventForm from "../pages/ContentManagement/Events/EventForm";
import Discounts from "../pages/ContentManagement/Discounts";
import DiscountForm from "../pages/ContentManagement/Discounts/DiscountForm";
import Contacts from "../pages/ContentManagement/Contacts";
import ContactForm from "../pages/ContentManagement/Contacts/Form";
import Leads from "../pages/ContentManagement/Leads";
import LeadForm from "../pages/ContentManagement/Leads/Form";
import Dashboard from "../pages/ContentManagement/Dashboard";

const ContentManagementRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route
        element={
          <RouteWrapper>
            <Outlet />
          </RouteWrapper>
        }
      >
        {/* DASHBOARD ROUTES */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* EVENT ROUTES */}
        <Route path="events" element={<Events />} />
        <Route path="events/create" element={<EventForm />} />
        <Route path="events/edit" element={<EventForm />} />
        <Route path="events/:event" element={<EventDetails />} />

        {/* CONTACTS ROUTES */}
        <Route path="contacts" element={<Contacts />} />
        <Route path="contacts/create" element={<ContactForm />} />
        <Route path="contacts/edit" element={<ContactForm />} />

        {/* LEADS ROUTES */}
        <Route path="leads" element={<Leads />} />
        <Route path="leads/create" element={<LeadForm />} />
        <Route path="leads/edit" element={<LeadForm />} />

        {/* COUPON ROUTES */}
        <Route path="discount" element={<Discounts />} />
        <Route path="discount/create" element={<DiscountForm />} />
        <Route path="discount/edit" element={<DiscountForm />} />
      </Route>
    </Routes>
  );
};
export default ContentManagementRoutes;
