export interface LoggedInUserProps {
    loggedIn: boolean;
    userName?: string;
    displayName?: string;
    userId?: string;
}

export interface NavProps {
  loggedInUser: LoggedInUserProps | undefined | null;
}

export interface Book {
  authors?: string[];
  description: string;
  image?: string;
  title: string;
}

export interface UserScore {
  userId: string;
  points: number;
}