import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../../Interfaces/User";

type PublicRouteProps = {
  user: User | null;
  redirectPath?: string;
  children?: ReactNode;
};

const PublicRoute = ({
  user,
  redirectPath = "/",
  children,
}: PublicRouteProps) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
};

export default PublicRoute;
