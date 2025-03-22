import { SignedUser } from "../redux/features/auth/types/loginType";
import usePersistedState from "./usePersistedState";

const usePersistentAuth = () => {
  const [sessionUser, setSessionUser] = usePersistedState<SignedUser | null>({
    defaultValue: null,
    storageKey: "session_user",
  });
  // const token = sessionStorage.getItem("token");

  return {
    // token,
    sessionUser,
    setSessionUser,
  };
};

export default usePersistentAuth;
