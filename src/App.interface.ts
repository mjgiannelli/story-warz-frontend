export interface LoggedInUserProps {
    loggedIn: boolean;
    userName?: string;
    displayName?: string;
    userId?: string;
}

export interface NavProps {
  setLoggedInUser: React.Dispatch<React.SetStateAction<LoggedInUserProps | undefined | null>>;
  loggedInUser: LoggedInUserProps | undefined | null;
}