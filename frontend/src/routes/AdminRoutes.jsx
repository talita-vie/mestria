import { Route } from 'react-router-dom';
import RoleRoute from '@/routes/RoleRoute';

export default function AdminRoutes () {
  return (
    <Route key="admin" element={<RoleRoute role="admin" />}>
    
  </Route>
);
}