import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login";
import SignupForm from "./pages/signup";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
