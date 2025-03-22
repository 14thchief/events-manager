import "./styles.css";
import { useState } from "react";
import { Link } from "react-router";
import white_logo from "../../../assets/images/white_logo.png";
import color_logo from "../../../assets/images/color_logo.png";
import backgroundImage from "../../../assets/images/auth_page.png";
import { useSignupMutation } from "../../../redux/features/auth/cmsAuthSlice";
import LoginUI from "./Login";
import SignupUI from "./SignUp";

const CMSPortalAuth = () => {
  const [authState, setAuthState] = useState("login");

  const [signup, { isLoading: isSignUpLoading }] = useSignupMutation();

  return (
    <div className="flex flex-col md:flex-row min-h-full w-full relative">
      {/* Global Logo for Mobile - Positioned at top left */}
      <div className="absolute top-0 left-0 p-4 md:hidden">
        <Link to="/web-portal">
          <img src={color_logo} alt="APLBC Events" className="w-20 md:w-28" />
        </Link>
      </div>

      {/* Left Section with Gold-Tinted Background */}
      <div className="relative flex-1 hidden md:block">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        {/* Gold Overlay */}
        <div className="absolute inset-0 bg-primary opacity-60" />

        {/* Left Section Content */}
        <div className="relative z-10 w-full h-full text-white">
          {/* Logo positioned at the top left */}
          <div className="p-8 absolute">
            <Link to="/web-portal" className="w-[150px] flex items-center">
              <img
                src={white_logo}
                alt="APLBC"
                className="object-contain h-[76px] w-[160px]"
              />
            </Link>
          </div>
          {/* Centered Text Content */}
          <div className="flex flex-col gap-4 justify-center items-start h-full max-w-full p-8">
            <h1 className="font-[300] text-[48px] text-left">
              Hey, welcome to
            </h1>
            <h1 className="text-[64px] font-bold">APLBC EVENT PORTAL</h1>
          </div>
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        {authState === "login" ? (
          <LoginUI setAuthState={setAuthState} />
        ) : (
          <SignupUI
            signup={signup}
            isLoading={isSignUpLoading}
            setAuthState={setAuthState}
          />
        )}
      </div>
    </div>
  );
};

export default CMSPortalAuth;
