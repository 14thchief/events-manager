import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_STARKS;

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  headers: {
    // "X-Api-External-Key": API_KEY,
  },
});

const baseApi = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});

export default baseApi;
