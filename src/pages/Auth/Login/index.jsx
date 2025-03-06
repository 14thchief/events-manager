import "./styles.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import white_logo from "../../../assets/images/white_logo.png";
import color_logo from "../../../assets/images/color_logo.png";
import backgroundImage from "../../../assets/images/auth_page.png";
import { useLoginMutation } from "../../../redux/features/auth/loginSlice";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt login; adjust payload structure as needed
      await login({ username, password }).unwrap();
      navigate("/cms/events");
    } catch (err) {
      setErrorMsg(err?.data?.message || "Login failed. Please try again.");
      navigate("/cms/events");
    }
  };

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
        <div className="absolute inset-0 bg-[#b49c4f] opacity-60" />

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
        <div className="w-full max-w-sm md:max-w-md h-max">
          <div className="flex flex-col md:gap-10 mb-8">
            <h1 className="text-2xl md:text-[55px] font-[600] text-gray-800 ">
              Login
            </h1>
            <p className="text-sm md:text-[24px] text-gray-500 font-[300]">
              Welcome back, please log in to your account
            </p>
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          </div>
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-600 mb-1 font-semibold"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded border-2 border-gray-200 focus:outline-none focus:border-[#b49c4f]"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-600 mb-1 font-semibold"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded border-2 border-gray-200 focus:outline-none focus:border-[#b49c4f]"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="checkbox-custom" />
                Remember me
              </label>
              <a
                href="/forgot-password"
                className="text-[#b49c4f] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-2 rounded bg-[#b49c4f] text-white font-semibold hover:bg-[#a48d42] transition-colors"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider with "or" */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-[#b49c4f]" />
            <span className="mx-2 text-[#b49c4f]">or</span>
            <hr className="flex-1 border-[#b49c4f]" />
          </div>

          {/* Sign in with Google */}
          <button
            type="button"
            className="bg-transparent w-full py-3 rounded border border-[#b49c4f] text-gray-400 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
          >
            <FcGoogle size={18} />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
