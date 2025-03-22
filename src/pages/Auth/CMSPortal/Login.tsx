import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router";
import { useLoginMutation } from "../../../redux/features/auth/cmsAuthSlice";
import { SigninPayload } from "../../../redux/features/auth/types/loginType";
import { toast } from "react-toastify";

// Define types for component props
interface LoginUIProps {
  setAuthState: (state: string) => void;
}

// Define validation schema using Yup
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginUI: React.FC<LoginUIProps> = ({ setAuthState }) => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const userInSession = Boolean(sessionStorage.getItem("token"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninPayload>({
    resolver: yupResolver(loginSchema),
  });

  // Handle form submission
  const onSubmit = async (data: SigninPayload) => {
    try {
      const response = await login(data).unwrap();

      toast.success("Signed in successfully");
      navigate("/cms/events");
    } catch (err: any) {
      if (err?.status === 401) {
        toast.error("Incorrect Email or Password. Please try again.");
      } else {
        toast.error(err?.data?.message || "Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-md h-max">
      {userInSession && <Navigate to={"/cms/events"} replace />}

      {/* Logo */}
      <div className="flex flex-col md:gap-10 mb-8">
        <h1 className="text-2xl md:text-[55px] font-[600] text-gray-800">
          Login
        </h1>
        <p className="text-sm md:text-[24px] text-gray-500 font-[300]">
          Welcome back, please log in to your account
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {...register("email")}
            placeholder="Enter your email"
            className="w-full p-3 rounded border-2 border-gray-200 focus:outline-none focus:border-primary"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
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
            {...register("password")}
            placeholder="Enter your password"
            className="w-full p-3 rounded border-2 border-gray-200 focus:outline-none focus:border-primary"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-600">
            <input type="checkbox" className="checkbox-custom" />
            Remember me
          </label>
          <a href="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 mt-2 rounded bg-primary text-white font-semibold transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#a48d42]"
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Divider with "or" */}
      <div className="flex items-center my-6">
        <hr className="flex-1 border-primary" />
        <span className="mx-2 text-primary">or</span>
        <hr className="flex-1 border-primary" />
      </div>

      {/* Sign Up Button */}
      <button
        onClick={() => setAuthState("signup")}
        type="button"
        className="bg-transparent w-full py-3 rounded border border-primary text-gray-400 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
      >
        <span>Sign Up</span>
      </button>
    </div>
  );
};

export default LoginUI;
