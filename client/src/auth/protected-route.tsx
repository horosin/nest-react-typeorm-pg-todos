import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";

export const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
};
