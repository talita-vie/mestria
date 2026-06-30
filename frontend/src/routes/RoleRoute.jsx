import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/contexts/AuthContext';

export default function RoleRoute({ role }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user?.roles?.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}