import { createSlice } from "@reduxjs/toolkit";
import cmsApi from "src/redux/api/cmsApi";
import clearStore from "src/utilities/clearStore";

const initialState = {};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logout: () => {
      clearStore();
      cmsApi.util.resetApiState();
    },
  },
});

export const { logout } = logoutSlice.actions;

export type LogoutAction = ReturnType<typeof logout>;

export default logoutSlice.reducer;
