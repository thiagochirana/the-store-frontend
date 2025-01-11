import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, allowedRoles }) => {
  const authState = useSelector((state) => state.auth);

  if (
    authState.status !== "succeeded" ||
    !allowedRoles.includes(authState.user.role)
  ) {
    return <Navigate to="/error/401" replace />;
  }

  return children;
};

export default ProtectedRoute;
