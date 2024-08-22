import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getUserData } from "./api";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/userSlice";

const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log("token", token);
        const response = await getUserData(token);

        if (response.data) {
          const userData = {
            name: response.data.name,
            userId: response.data.id,
            email: response.data.email,
            picture: response.data.picture,
            token: token,
            isAdmin: response.data.isAdmin,
          };

          dispatch(userLoggedIn(userData));
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, getAccessTokenSilently]);

  return null;
};

export default Profile;
