import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "../../Interfaces/User";

type ProtectedRouteProps = {
  user: User | null;
  requiredRole?: string | string[]; // Puede ser un rol o un array de roles
  redirectPath?: string;
  children?: ReactNode;
};

const ProtectedRoute = ({
  user,
  requiredRole,
  redirectPath = "/",
  children,
}: ProtectedRouteProps) => {
  const location = useLocation();

  // Si no hay usuario autenticado, redirigir
  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Si se requiere un rol y el usuario no lo tiene, redirigir
  if (requiredRole) {
    const hasAccess = Array.isArray(requiredRole)
      ? requiredRole.includes(user.role) // Verifica si el rol del usuario está en la lista de roles requeridos
      : user.role === requiredRole; // Verifica si el rol del usuario coincide con el rol requerido

    if (!hasAccess) {
      return <Navigate to="/forbidden" state={{ from: location }} replace />; // Redirigir a una página de acceso denegado
    }
  }

  // Si pasa todas las verificaciones, renderiza la ruta protegida
  return children || <Outlet />;
};

export default ProtectedRoute;
