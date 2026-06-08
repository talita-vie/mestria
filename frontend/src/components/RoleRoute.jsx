import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RoleRoute({ role }) {
  const { user } = useAuth();

  if (!user?.roles?.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}