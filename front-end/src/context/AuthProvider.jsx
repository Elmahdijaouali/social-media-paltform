import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = "http://localhost:3000/api/v1/auth";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Login function
const loginUser = async ({ username, password }) => {
  const response = await axios.post(`${API_BASE}/login`, {
    username,
    password,
  });
  return response.data;
};

const signupUser = async ({ firstname, lastname, username, password }) => {
  const response = await axios.post(`${API_BASE}/register`, {
    username,
    password,
    firstname,
    lastname,
  });
  return response.data;
};

const logoutUser = async (token) => {
  await axios.post(
    `${API_BASE}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Fetch user info from backend using token
const fetchUser = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }
  
  try {
    const response = await axios.get(`${API_BASE}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // Handle different response structures
    const userData = response.data.user || response.data;
    
    if (!userData) {
      throw new Error("No user data received from server");
    }
    
    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    // Prevent "undefined" string tokens
    return storedToken && storedToken !== "undefined" ? storedToken : null;
  });
  const queryClient = useQueryClient();

  // Fetch user info with React Query
  const {
    data: user,
    refetch: refetchUser,
    isLoading: userLoading,
    isError: userError,
    error: userErrorObj,
  } = useQuery({
    queryKey: ["user", token],
    queryFn: () => fetchUser(token),
    enabled: !!token && token !== "undefined",
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    onError: (error) => {
      console.error("User fetch error:", error);
      setToken(null);
      localStorage.removeItem("token");
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(token),
    onSuccess: () => {
      setToken(null);
      localStorage.removeItem("token");
      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onError: () => {
      setToken(null);
      localStorage.removeItem("token");
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });

  // Logout function for context
  const logout = () => {
    logoutMutation.mutate();
  };

  // Keep token in sync with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userLoading,
        userError,
        userErrorObj,
        refetchUser,
        token,
        login: loginMutation.mutate,
        loginStatus: loginMutation.status,
        loginError: loginMutation.error,
        signup: signupMutation.mutate,
        signupStatus: signupMutation.status,
        signupError: signupMutation.error,
        logout,
        logoutStatus: logoutMutation.status,
        logoutError: logoutMutation.error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
