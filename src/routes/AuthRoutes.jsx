import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router";
import Login from "../pages/Auth/Login";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="login" replace />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default AuthRoutes;
