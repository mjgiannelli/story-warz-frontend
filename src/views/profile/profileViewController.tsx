import { useEffect, useState } from "react";
import { LoggedInUserProps } from "../../App.interface";
import { UserDTO } from "../../api/user/user.interface";
import { UserAPI } from "../../api/user/user.api";

const useProfileViewController = (
  loggedInUser: LoggedInUserProps | undefined | null
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserDTO | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    console.log("logged in user: ", loggedInUser);
    const fetchProfile = async () => {
      const resp = await UserAPI.getProfile(loggedInUser?.userId as string);
      console.log("resp: ", resp);
      if (resp.id) {
        setProfile(resp);
        setLoading(false);
      } else {
        setLoading(false);
        setErrorMessage(
          `There was an error trying to retreive your profile: ${resp.error}`
        );
      }
    };
    fetchProfile();
  }, []);
  return { profile, errorMessage, loading };
};

export default useProfileViewController;
