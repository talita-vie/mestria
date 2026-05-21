import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import './index.css'
import RegisterPage from'./components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage';
import VerifyEmailPage from './components/pages/VerifyEmailPage';
import VerifyEmailSuccessPage from './components/pages/VerifyEmailSuccessPage';
import DashboardPage from './components/pages/DashboardPage';


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          {/*Rotas públicas*/}
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verificar-email" element={<VerifyEmailPage />} />
          <Route path="/conta-verificada" element={<VerifyEmailSuccessPage />} />

          {/*Rotas privadas*/}
          <Route element = {<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}