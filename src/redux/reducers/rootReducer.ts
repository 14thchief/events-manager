import { Action, combineReducers } from "@reduxjs/toolkit";
import actionModalSlice from "../features/util/actionModalSlice";
import baseApi from "../api/baseApi";
import authApi from "../api/authApi";
import cmsApi from "../api/cmsApi";
import logoutSlice, { logout } from "../features/auth/util/logoutSlice";
import eventSlice from "../features/cms/util/eventSlice";
import environmentSlice from "../features/cms/util/environmentSlice";

// Define the RootState type based on the combined reducer
type RootState = ReturnType<typeof appReducer>;

// Define the RootAction type to include all possible actions
type RootAction = Action<string>;

const appReducer = combineReducers({
  actionModal: actionModalSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [cmsApi.reducerPath]: cmsApi.reducer,
  event: eventSlice,
  logout: logoutSlice,
  env: environmentSlice,
});

const rootReducer = (state: RootState | undefined, action: RootAction) => {
  if (action.type === logout.type) {
    console.log("Logout action detected, resetting state.");
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
