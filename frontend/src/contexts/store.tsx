"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"; // Add useEffect to the import
import Cookies from "js-cookie";
import { set } from "jodit/types/core/helpers";

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  userRole: string | null;
  setUserRole: (userRole: string | null) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) {
      setIsLoggedIn(true);
    }
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
      }}
    >
      {children}
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
