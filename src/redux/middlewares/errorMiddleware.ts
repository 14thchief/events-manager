import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { openActionModal } from "../features/util/actionModalSlice";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    // Ignore Errors from these endpoints
    const whitelistedTags = ["login"];
    const blocked401Modal = whitelistedTags.includes(
      action.meta?.arg?.endpointName
    );

    if (isRejectedWithValue(action)) {
      // Assuming the error object has a status property or similar
      const error = action.payload;
      const hasRefreshToken = Boolean(sessionStorage.getItem("r_token"));

      if (error.status === 401 && !blocked401Modal && !hasRefreshToken) {
        // Dispatch an action to set a global state or use a context to trigger redirection
        // This is a placeholder action. Replace it with your actual action to trigger redirection.
        api.dispatch({ type: "REDIRECT_TO_LOGIN" });
        api.dispatch(
          openActionModal({
            isOpen: true,
            title: "Session Expired!",
            type: "warning",
            content: "Kindly logout and log back in to continue.",
            callback: () => (window.location.href = "/auth/cms"),
            callbackText: "Go to Login",
            blockCancel: true,
          })
        );
        console.warn(
          "Received 401 error. Token refresh should handle this case."
        );
      } else if (error.status === 400) {
        toast.error(
          typeof error.data?.message == "string"
            ? error.data?.message
            : error.data?.message[0]
        );
        // toast.warn("A warning");
      } else {
        // console.warn("We got a rejected action!", action);
        // toast.warn("A warning");
      }
    }

    return next(action);
  };
