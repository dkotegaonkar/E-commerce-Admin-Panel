import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../context/useAuthStore";

const ProtectedRoute = () => {
  const { token } = useAuthStore(); 

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;