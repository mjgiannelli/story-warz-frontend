import { useEffect, useState } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingView from "./views/landing/landingView";
import LoginView from "./views/login/loginView";
import SignUpView from "./views/signUp/signUpView";
import Auth from "./utilities/auth";
import { LoggedInUserProps } from "./App.interface";
import LoadingComponent from "./components/loading/loading";
import ProfileView from "./views/profile/profileView";
import { SocketProvider } from "./context/socketContext";

const ProtectedRoute = ({
  user,
  children,
}: {
  user: LoggedInUserProps | null | undefined;
  children: React.ReactNode;
}) => {
  if (user === undefined) return <LoadingComponent />;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

function App() {
  const [loggedInUser, setLoggedInUser] = useState<
    LoggedInUserProps | undefined | null
  >(undefined);
  // Scroll to top
  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 100); // 100 ms delay
    const loggedInUser = Auth.loggedIn();
    setLoggedInUser(loggedInUser);
  }, []);

  if(loggedInUser === undefined) return (<LoadingComponent />);

  return (
    <>
      {!loggedInUser ? (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                loggedInUser === undefined ? (
                  <LoadingComponent />
                ) : (
                  <LandingView loggedInUser={loggedInUser} />
                )
              }
            />
            <Route
              path="/login"
              element={<LoginView loggedInUser={loggedInUser} />}
            />
            <Route path="/sign-up" element={<SignUpView />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute user={loggedInUser}>
                  <ProfileView loggedInUser={loggedInUser} />
                </ProtectedRoute>
              }
            />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      ) : (
        <SocketProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  loggedInUser === undefined ? (
                    <LoadingComponent />
                  ) : (
                    <LandingView loggedInUser={loggedInUser} />
                  )
                }
              />
              <Route
                path="/login"
                element={<LoginView loggedInUser={loggedInUser} />}
              />
              <Route path="/sign-up" element={<SignUpView />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute user={loggedInUser}>
                    <ProfileView loggedInUser={loggedInUser} />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Router>
        </SocketProvider>
      )}
    </>
  );
}

export default App;
