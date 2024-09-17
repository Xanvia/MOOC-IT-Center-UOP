"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  userRole: string | null;
  setUserRole: (userRole: string | null) => void;
  isInitialized: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      const tokenFromCookie = Cookies.get("token");
      if (tokenFromCookie) {
        setIsLoggedIn(true);
        const userFromCookie = Cookies.get("user");
        if (userFromCookie) {
          const parsedUser = JSON.parse(userFromCookie);
          setUserRole(parsedUser.userRole);
        }
      }
      setLoading(false);
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setLoading,
        userRole,
        setUserRole,
        isInitialized,
      }}
    >
      {isInitialized ? children : null}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalContextProvider");
  }
  return context;
};

// Custom hook for authentication
export const useAuth = () => {
  const { isLoggedIn, setIsLoggedIn, userRole, setUserRole, isInitialized } = useGlobal();

  const login = (token: string, user: { userRole: string }) => {
    Cookies.set("token", token);
    Cookies.set("user", JSON.stringify(user));
    setIsLoggedIn(true);
    setUserRole(user.userRole);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return { isLoggedIn, userRole, login, logout, isInitialized };
};