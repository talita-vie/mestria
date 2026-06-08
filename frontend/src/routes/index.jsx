import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from '../components/PrivateRoute'; 
import AuthRoutes from '@/routes/AuthRoutes';
import InstructorRoutes from '@/routes/InstructorRoutes';
import AdminRoutes from '@/routes/AdminRoutes';
import DashboardPage from '../pages/DashboardPage';
import AppLayout from '@/components/layouts/AppLayout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          
          {/* Chama a função para retornar os nós <Route> diretamente */}
          {AuthRoutes()}
          
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              
              {/* Aplique o mesmo princípio para as rotas restritas */}
              {InstructorRoutes()}
              {AdminRoutes()}
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}