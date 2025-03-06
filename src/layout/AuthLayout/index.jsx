import { Outlet } from "react-router";

const AuthLayout = ({ children }) => {
  return (
    <div className={``}>
      <div className={`${!children ? `` : ""}`}>{children || <Outlet />}</div>
    </div>
  );
};

export default AuthLayout;
