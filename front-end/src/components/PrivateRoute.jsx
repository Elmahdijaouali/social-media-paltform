import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, token, userLoading } = useAuth();
  if (userLoading) return null; // Optionally, return a spinner here
  if (!token || !user) return <Navigate to="/" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { user, token, userLoading } = useAuth();
  if (userLoading) return null;
  if (token && user) return <Navigate to="/app/home" replace />;
  return children;
};

export { PrivateRoute, PublicRoute };
