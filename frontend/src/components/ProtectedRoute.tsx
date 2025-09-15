
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children:any }) => {
  const token = localStorage.getItem("token");
    
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children; 
};

