import { Outlet } from "react-router";

const AuthLayout = ({ children = null }) => {
  return (
    <div className={`w-screen h-screen`}>
      <div className={`p-2 md:p-8 h-full ${!children ? `` : ""}`}>
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default AuthLayout;
