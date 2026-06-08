import { Route } from 'react-router-dom';
import PublicRoute from '@/components/PublicRoute';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import VerifyEmailPage from '@/pages/auth/VerifyEmailPage';
import VerifyEmailSuccessPage from '@/pages/auth/VerifyEmailSuccessPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ForgotPasswordSuccessPage from '@/pages/auth/ForgotPasswordSucessPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import ResetPasswordSuccessPage from '@/pages/auth/ResetPasswordSuccessPage';

export default function AuthRoutes() {
  return (
  <Route key="auth" element={<PublicRoute />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/cadastro" element={<RegisterPage />} />
    <Route path="/verificar-email" element={<VerifyEmailPage />} />
    <Route path="/conta-verificada" element={<VerifyEmailSuccessPage />} />
    <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
    <Route path="/email-enviado" element={<ForgotPasswordSuccessPage />} />
    <Route path="/reset-senha" element={<ResetPasswordPage />} />
    <Route path="/senha-redefinida" element={<ResetPasswordSuccessPage />} />
  </Route>
);
}