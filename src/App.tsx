import { useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingView from "./views/landing/landingView";
import LoginView from "./views/login/loginView";
import SignUpView from "./views/signUp/signUpView";
import Auth from "./utilities/auth";
import { LoggedInUserProps } from "./App.interface";
import LoadingComponent from "./components/loading/loading";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<
    LoggedInUserProps | undefined | null
  >(undefined);
  // Scroll to top
  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 100); // 100 ms delay
    setLoggedInUser(Auth.loggedIn());
    console.log("running");
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedInUser === undefined ? (
              <LoadingComponent />
            ) : (
              <LandingView
                setLoggedInUser={setLoggedInUser}
                loggedInUser={loggedInUser}
              />
            )
          }
        />
        <Route
          path="/login"
          element={
            <LoginView
              setLoggedInUser={setLoggedInUser}
              loggedInUser={loggedInUser}
            />
          }
        />
        <Route path="/sign-up" element={<SignUpView />} />
        <Route path="/profile" element={<div>{loggedInUser?.displayName}' Profile</div>} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
