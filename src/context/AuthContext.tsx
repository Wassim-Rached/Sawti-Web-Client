"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getAccountInfo } from "@/services/accounts";
import LoadingScreen from "@/components/LoadingScreen";
import { Account } from "@/types";

export type AuthContextType = {
  account: Account | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  refreshAccount: () => void;
};

const AuthContext = createContext<AuthContextType>({
  account: null,
  isLoggedIn: false,
  loading: false,
  login: () => {},
  logout: () => {},
  refreshAccount: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    refreshAccount();
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    refreshAccount();
  };

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    localStorage.removeItem("token");
    setAccount(null);
    setIsLoggedIn(false);
  };

  const refreshAccount = async () => {
    if (!account) {
      setLoading(true);
    }
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<Account>(token);
        const fetchedAccount = await getAccountInfo(decoded.cin);
        setAccount(fetchedAccount);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching account info:", error);
        setAccount(null);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      }
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <AuthContext.Provider
          value={{
            account,
            isLoggedIn,
            loading,
            login,
            logout,
            refreshAccount,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
