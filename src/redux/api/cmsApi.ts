import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./baseApi";
import { toast } from "react-toastify";

// Base query that attaches the access token from sessionStorage
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// A separate base query without the default prepareHeaders for refresh calls.
const refreshBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    // Do not attach the access token here.
    return headers;
  },
});

// Custom base query with token refresh logic
const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, any>
) => {
  // The original request using the latest token
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401, attempt to refresh the token and retry the request
  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    const refreshToken = sessionStorage.getItem("r_token");
    if (refreshToken) {
      const refreshResult = await refreshBaseQuery(
        {
          url: "/renew-access-token",
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { access_token: newToken, refresh_token: newRToken } = (
          refreshResult.data as any
        )?.data as {
          access_token: string;
          refresh_token: string;
        };

        // Store new tokens
        sessionStorage.setItem("token", newToken);
        sessionStorage.setItem("r_token", newRToken);

        // Retry the original request with the new token
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};

export const cmsApi = createApi({
  reducerPath: "cms",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["events", "coupons"],
  endpoints: () => ({}),
});

export default cmsApi;
