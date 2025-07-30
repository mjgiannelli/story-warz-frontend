import { useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingView from "./views/landing/landingView";
import LoginView from "./views/login/loginView";
import SignUpView from "./views/signUp/signUpView";

function App() {

  // Scroll to top
  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 100); // 100 ms delay
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="sign-up" element={<SignUpView />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
