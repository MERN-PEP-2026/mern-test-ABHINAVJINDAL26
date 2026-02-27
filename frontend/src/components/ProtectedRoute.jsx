
import { Navigate } from "react-router-dom";

function AuthGate({ children }) {
  const jwt = localStorage.getItem("token");
  if (!jwt) return <Navigate to="/login" replace />;
  return children;
}

export default AuthGate;
