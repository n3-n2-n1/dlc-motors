import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { User } from "../../Interfaces/User";

type ProtectedRouteProps = {
  user: User | null;
  // requiredRole?: string;
  redirectPath?: string;
  children?: ReactNode;
};

const ProtectedRoute = ({
  user,
  // requiredRole,
  redirectPath = "/",
  children,
}: ProtectedRouteProps) => {
  const location = useLocation();

  // if (!user || (requiredRole && user.role !== requiredRole)) {
  //   return <Navigate to={redirectPath} state={{ from: location }} replace />;
  // }

  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
