import { createSlice } from "@reduxjs/toolkit";
import adminApi from "../../../api/adminApi";
import clearStore from "../../../../utilities/clearStore";

const initialState = {};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logout: () => {
      clearStore();
      adminApi.util.resetApiState();
    },
  },
});

export const { logout } = logoutSlice.actions;

export type LogoutAction = ReturnType<typeof logout>;

export default logoutSlice.reducer;
