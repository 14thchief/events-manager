import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const LoginUI = ({ login, isLoading, setAuthState }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        const response = await login({ email, password }).unwrap();
        console.log({ response });
        toast.success("Signed in successfully");
        navigate("/cms/events");
      }
    } catch (err) {
      setErrorMsg(err?.data?.message || "Login failed. Please try again.");
      navigate("/cms/events");
    }
  };

  return (
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
            htmlFor="email"
            className="block text-gray-600 mb-1 font-semibold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
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
            required
            placeholder="Enter your password"
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
          <a href="/forgot-password" className="text-[#b49c4f] hover:underline">
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
        onClick={() => setAuthState("signup")}
        type="button"
        className="bg-transparent w-full py-3 rounded border border-[#b49c4f] text-gray-400 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
      >
        {/* <FcGoogle size={18} /> */}
        <span>Sign Up</span>
      </button>
    </div>
  );
};

export default LoginUI;
