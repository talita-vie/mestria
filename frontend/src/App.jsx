import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import './index.css'
import RegisterPage from'./pages/RegisterPage'
import LoginPage from './pages/LoginPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import VerifyEmailSuccessPage from './pages/VerifyEmailSuccessPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ForgotPasswordSuccessPage from './pages/ForgotPasswordSucessPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ResetPasswordSuccessPage from './pages/ResetPasswordSuccessPage';


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
          <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
          <Route path="/email-enviado" element={<ForgotPasswordSuccessPage />} />
          <Route path="/reset-senha" element={<ResetPasswordPage />} />
          <Route path="/senha-redefinida" element={<ResetPasswordSuccessPage />} />
          
          {/*Rotas privadas*/}
          <Route element = {<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}