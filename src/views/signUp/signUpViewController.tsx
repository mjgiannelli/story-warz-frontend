import { useEffect, useState } from 'react';
import Auth from "../../utilities/auth";
import { UserAPI } from '../../api/user/user.api';

const useSignUpViewController = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value);

  const handleSignUp = async (
      e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent
    ) => {
      e.preventDefault();
  
      if (username === "" || password === "") {
        setErrorMessage(
          "Please enter a valid username and password before submitting"
        );
        return;
      }
  
      const resp = await UserAPI.signUp({
        username: username,
        password: password,
        displayName: displayName,
      });
  
      if (resp.token) {
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );
  
        const token = resp.token;
        const refreshToken = resp.refreshToken;
  
        Auth.login(token, refreshToken);
      } else {
        setErrorMessage(resp.message);
      }
    };
  
    useEffect(() => {
      const listener = (ev: KeyboardEvent) => {
        if (ev.code === "Enter" || ev.code === "NumpadEnter") {
          ev.preventDefault();
          handleSignUp(ev);
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    },);

  return {
    username,
    password,
    displayName,
    handleUsernameChange,
    handlePasswordChange,
    handleDisplayNameChange,
    handleSignUp
  };
}

export default useSignUpViewController;