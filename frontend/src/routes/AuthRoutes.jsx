import { Route } from 'react-router-dom';
import PublicRoute from '@/routes/PublicRoute';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import VerifyEmailPage from '@/features/auth/pages/VerifyEmailPage';
import VerifyEmailSuccessPage from '@/features/auth/pages/VerifyEmailSuccessPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';
import ForgotPasswordSuccessPage from '@/features/auth/pages/ForgotPasswordSucessPage';
import ResetPasswordPage from '@/features/auth/pages/ResetPasswordPage';
import ResetPasswordSuccessPage from '@/features/auth/pages/ResetPasswordSuccessPage';

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