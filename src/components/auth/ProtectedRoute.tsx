import { type ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth.tsx';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: string;
  fallback?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredPermission, 
  fallback = <div className="p-8 text-center">Acceso denegado</div> 
}: ProtectedRouteProps) {
  const { hasPermission, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-8 text-center">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <div className="p-8 text-center">Por favor inicia sesión</div>;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback;
  }

  return <>{children}</>;
}
