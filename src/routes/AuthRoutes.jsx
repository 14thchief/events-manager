import { Route, Routes, Navigate } from "react-router";
import CMSPortal from "../pages/Auth/CMSPortal";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="cms" replace />} />
      <Route path="cms" element={<CMSPortal />} />
    </Routes>
  );
};

export default AuthRoutes;
