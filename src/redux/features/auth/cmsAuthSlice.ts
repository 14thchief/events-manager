import authApi from "../../api/authApi";
import { AuthResponse, SignedUser, SigninPayload } from "./types/loginType";
// import { toast } from "react-toastify";

const cmsAuthSlice = authApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse["data"], SigninPayload>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: {
          ...data,
        },
      }),
      transformResponse: (response: AuthResponse) => {
        return response.data;
      },
      transformErrorResponse: (error) => {
        return error;
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          sessionStorage.setItem("session_user", JSON.stringify(data.user));
          sessionStorage.setItem("token", data.auth?.access_token);
          sessionStorage.setItem("r_token", data.auth?.refresh_token);
          sessionStorage.setItem(
            "token_expires_at",
            data.auth?.access_token_expires_at.toString()
          );
        } catch (err: any) {
          // err.error.data.message && toast.error(typeof err.error?.data?.message === "string"? err.error.data.message : err.error.data.message[0]);
        }
      },
    }),
    signup: builder.mutation<SignedUser, SigninPayload>({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: {
          ...data,
        },
      }),
      transformResponse: (response: { data: SignedUser }) => {
        return response.data;
      },
    }),
    sendResetLink: builder.mutation<SignedUser, SigninPayload["email"]>({
      query: (data) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: {
          email: data,
        },
      }),
      transformResponse: (response: { data: SignedUser }) => {
        return response.data;
      },
    }),
    resetPassword: builder.mutation<SignedUser, SigninPayload>({
      query: (data) => ({
        url: "auth/reset-password",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { data: SignedUser }) => {
        return response.data;
      },
    }),
    savePassword: builder.mutation<SignedUser, SigninPayload>({
      query: (data) => ({
        url: "user/account-setup",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { data: SignedUser }) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useSendResetLinkMutation,
  useResetPasswordMutation,
  useSavePasswordMutation,
} = cmsAuthSlice;
export default cmsAuthSlice;
