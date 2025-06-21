import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Auth/Login";
import SignupForm from "./pages/Auth/Signup";
import UserProfile from "./pages/UserProfile";
import ChatPage from "./pages/Chat-page";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
};

export default App;
