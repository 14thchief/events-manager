import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";

const SignupUI = ({ signup, isLoading, setAuthState }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (fullName && email && password) {
        const response = await signup({
          full_name: fullName,
          email,
          password,
        }).unwrap();
        console.log({ response });
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
        <h1 className="text-2xl md:text-[55px] min-w-max font-[600] text-gray-800 ">
          Create an Account
        </h1>
        <p className="flex items-end gap-4 text-sm md:text-[24px] text-gray-500 font-[300]">
          Already have an account?{" "}
          <p
            className="text-primary hover:underline"
            onClick={() => setAuthState("login")}
          >
            Log in
          </p>
        </p>
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
      </div>
      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="full_name"
            className="block text-gray-600 mb-1 font-semibold"
          >
            Full Name
          </label>
          <input
            required
            id="full_name"
            type="text"
            placeholder="Enter your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded border-2 border-gray-200 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-600 mb-1 font-semibold"
          >
            Email
          </label>
          <input
            required
            id="email"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded border-2 border-gray-200 focus:outline-none focus:border-primary"
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
            required
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded border-2 border-gray-200 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-primary">
            <input required type="checkbox" className="checkbox-custom" />I have
            agreed to the terms & conditions
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-2 rounded bg-primary text-white font-semibold hover:bg-[#a48d42] transition-colors"
        >
          {isLoading ? "Please wait..." : "Sign up"}
        </button>
      </form>

      {/* Divider with "or" */}
      <div className="flex items-center my-6">
        <hr className="flex-1 border-primary" />
        <span className="mx-2 text-primary">or</span>
        <hr className="flex-1 border-primary" />
      </div>

      {/* Sign in with Google */}
      <button
        onClick={() => setAuthState("signup")}
        type="button"
        className="bg-transparent w-full py-3 rounded border border-primary text-gray-400 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
      >
        <FcGoogle size={18} />
        <span>Sign up with Google</span>
      </button>
    </div>
  );
};

export default SignupUI;
