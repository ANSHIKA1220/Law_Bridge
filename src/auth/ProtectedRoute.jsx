import { Navigate } from "react-router-dom";
import { getUser } from "./auth.js";

function ProtectedRoute({ role, children }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
