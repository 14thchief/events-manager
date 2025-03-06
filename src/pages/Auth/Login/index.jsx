import "./styles.css";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import white_logo from "../../../assets/images/white_logo.png";

// Replace this with your actual background image or remove if you prefer a solid color
const backgroundImage = "https://via.placeholder.com/600x800.png?text=Event+BG";

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
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
        <div className="relative z-10 w-full h-full flex flex-col justify-center p-8 text-white">
          {/* Logo (Optional) */}
          <a
            href="https://ap-lbc.com/"
            className="mb-6 w-[150px] flex items-center"
          >
            <img
              src={white_logo}
              alt="APLBC"
              className="object-contain h-10 w-auto"
            />
          </a>
          <div className="max-w-md">
            <h1 className="text-3xl font-bold mb-4 leading-snug">
              Hey, welcome to
              <br />
              APLBC EVENT PORTAL
            </h1>
            <p className="text-sm leading-relaxed">
              Where business meets opportunity. Join us and manage your events
              with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Login</h1>
          <p className="text-sm text-gray-500 mb-6">
            Welcome back, please log in to your account
          </p>

          {/* Login Form */}
          <form className="space-y-4">
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
              className="w-full py-3 mt-2 rounded bg-[#b49c4f] text-white font-semibold hover:bg-[#a48d42] transition-colors"
            >
              Login
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
