import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/Auth/Login";
import SignupForm from "./pages/Auth/Signup";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Friends from "./pages/Friends";
import GeneralLayout from "./layouts/GeneralLayout";
import { PrivateRoute, PublicRoute } from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupForm />
            </PublicRoute>
          }
        />
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <GeneralLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="messages" element={<Messages />} />
          <Route path="friends" element={<Friends />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
