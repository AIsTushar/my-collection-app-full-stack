import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser } from "./api";

export const SignupHandler = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const signupUser = async () => {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently();

        createUser(user, token);
      }
    };

    signupUser();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return null;
};
