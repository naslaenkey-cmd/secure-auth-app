import { createContext, useContext, useEffect, useState } from "react";

import {
  registerUser,
  loginUser,
  getUserById,
  checkUsername as checkUsernameApi
} from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = () => {
    return localStorage.getItem("userId") !== null;
  };

  const fetchCurrentUser = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const currentUser = await getUserById(userId);

      setUser(currentUser);
    } catch (error) {
      console.log("Could not fetch user");

      localStorage.removeItem("userId");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const users = await loginUser(email);

      if (users.length === 0) {
        return {
          success: false,
          message: "Invalid email or password"
        };
      }

      const foundUser = users[0];

      if (foundUser.password !== password) {
        return {
          success: false,
          message: "Invalid email or password"
        };
      }

      localStorage.setItem("userId", foundUser.id);
      setUser(foundUser);

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong"
      };
    }
  };

  const register = async (userData) => {
    try {
      const existingUsers = await checkUsernameApi(userData.username);

      if (existingUsers.length > 0) {
        return {
          success: false,
          message: "Username already exists"
        };
      }

      const newUser = await registerUser(userData);

      localStorage.setItem("userId", newUser.id);
      setUser(newUser);

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        message: "Registration failed"
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };

  const checkUsername = async (username) => {
    try {
      const users = await checkUsernameApi(username);

      return users.length > 0;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
        fetchCurrentUser,
        checkUsername
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};