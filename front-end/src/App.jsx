import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/login";
import SignupForm from "./pages/signup";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Friends from "./pages/Friends";
import GeneralLayout from "./layouts/GeneralLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/app" element={<GeneralLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="messages" element={<Messages />} />
          <Route path="friends" element={<Friends />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
