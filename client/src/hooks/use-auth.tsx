import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./use-local-storage";
import { Outlet } from "react-router-dom";

import { api } from "@/api";

const AuthContext = createContext<AuthContextType | null>(null); // Provide a default value for createContext

export const AuthProvider = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const loginResult = await api.auth.login(email, password);
    const accessToken = loginResult?.accessToken;
    setUser({ email, accessToken });
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    navigate("/auth/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  );
};

type AuthContextType = {
  user: any;
  login: (data: any) => void;
  logout: () => void;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
