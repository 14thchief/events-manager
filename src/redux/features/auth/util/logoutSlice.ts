import { createSlice } from "@reduxjs/toolkit";
import cmsApi from "../../../api/cmsApi";
import clearStore from "../../../../utilities/clearStore";

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
