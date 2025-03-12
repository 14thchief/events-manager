import authApi from "../../api/authApi";
import {
  ResetPasswordPayload,
  SignedUser,
  SigninPayload,
} from "./types/loginType";
// import { toast } from "react-toastify";

const cmsAuthSlice = authApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<SignedUser, SigninPayload>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: {
          ...data,
        },
      }),
      transformResponse: (response: { data: SignedUser }) => {
        return response.data;
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("session_user", JSON.stringify(data));
          localStorage.setItem("token", data.auth?.access_token);
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
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("session_user", JSON.stringify(data));
          localStorage.setItem("token", data.accessToken);
        } catch (err: any) {
          // err.error.data.message && toast.error(typeof err.error?.data?.message === "string"? err.error.data.message : err.error.data.message[0]);
        }
      },
    }),
    sendResetLink: builder.mutation<SignedUser, SigninPayload["username"]>({
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
    resetPassword: builder.mutation<SignedUser, ResetPasswordPayload>({
      query: (data) => ({
        url: "auth/reset-password",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { data: SignedUser }) => {
        return response.data;
      },
    }),
    savePassword: builder.mutation<SignedUser, ResetPasswordPayload>({
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
