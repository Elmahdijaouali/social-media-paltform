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

const logoutUser = async () => {
  // Since the backend logout route is commented out, we'll just handle logout locally
  // If you want to implement server-side logout later, uncomment the backend route and this code
  /*
  await axios.post(
    `${API_BASE}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  */
  
  // For now, just return success to handle logout locally
  return { success: true };
};

// Helper function to check if JWT token is expired
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true; // If we can't parse the token, consider it invalid
  }
};

// Fetch user info from backend using token
const fetchUser = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }
  
  // Check if token is expired before making the request
  if (isTokenExpired(token)) {
    throw new Error("Token is expired");
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
    // Prevent "undefined" string tokens and expired tokens
    if (storedToken && storedToken !== "undefined") {
      // Check if token is expired
      if (isTokenExpired(storedToken)) {
        localStorage.removeItem("token");
        return null;
      }
      return storedToken;
    }
    return null;
  });
  const [signupSuccessMessage, setSignupSuccessMessage] = useState(null);
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
    onSuccess: () => {
      // Backend doesn't return a token on signup, so we don't set it
      // User needs to login after signup
      setSignupSuccessMessage("Account created successfully! Welcome aboard!");
      // Don't invalidate user queries since user isn't logged in yet
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(),
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

  // Function to clear success message
  const clearSignupSuccessMessage = () => {
    setSignupSuccessMessage(null);
  };

  // Function to set success message (for manual control)
  const setSignupSuccess = (message) => {
    setSignupSuccessMessage(message);
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
        signupSuccessMessage,
        clearSignupSuccessMessage,
        setSignupSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
