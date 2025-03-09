import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./baseApi";

export const ALL_TAGS = ["events"];

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const cmsApi = createApi({
  reducerPath: "cms",
  baseQuery,
  tagTypes: ALL_TAGS,
  endpoints: () => ({}),
});

export default cmsApi;
