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
  bookId: string; // GoogleBooks ID
  image?: string;
  title: string;
  link?: string;
}