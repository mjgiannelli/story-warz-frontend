export interface LoggedInUserProps {
    loggedIn: boolean;
    userName?: string;
    displayName?: string;
    userId?: string;
}

export interface NavProps {
  loggedInUser: LoggedInUserProps | undefined | null;
}