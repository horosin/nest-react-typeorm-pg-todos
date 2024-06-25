import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./use-local-storage";
import { Outlet } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

import { api } from "@/api";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      const loginResult = await api.auth.login(email, password);
      const accessToken = loginResult?.accessToken;
      setUser({ email, accessToken });
      navigate("/");
    } catch (error) {
      console.error(error as Error);
      toast({
        title: error instanceof Error ? error.message : "Error occurred",
      });
    }
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
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
