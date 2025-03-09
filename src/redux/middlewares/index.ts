import authApi from "../api/authApi";
import baseApi from "../api/baseApi";
import cmsApi from "../api/cmsApi";

export const combineMiddlewares = [
  baseApi.middleware,
  authApi.middleware,
  cmsApi.middleware,
];
