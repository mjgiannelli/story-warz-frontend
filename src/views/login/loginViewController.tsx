import { useEffect, useState } from "react";
import Auth from "../../utilities/auth";
import { AuthAPI } from "../../api/auth/auth.api";
import { LoggedInUserProps } from "../../App.interface";

const useLoginViewController = (
  setLoggedInUser: React.Dispatch<React.SetStateAction<LoggedInUserProps | undefined | null>>,
  loggedInUser: LoggedInUserProps | undefined | null
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent
  ) => {
    e.preventDefault();
    setLoading(true);
    if (username === "" || password === "") {
      setLoading(false);
      setErrorMessage(
        "Please enter a valid username and password before submitting"
      );
      return;
    }

    const resp = await AuthAPI.login({
      username: username,
      password: password,
    });

    if (resp.token) {
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );

      const token = resp.token;
      const refreshToken = resp.refreshToken;

      Auth.login(token, refreshToken);
    } else {
      setLoading(false);
      setErrorMessage(resp.message);
    }
  };

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      if (ev.code === "Enter" || ev.code === "NumpadEnter") {
        ev.preventDefault();
        handleLogin(ev);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
    setLoading,
    errorMessage,
    loading,
  };
};

export default useLoginViewController;
