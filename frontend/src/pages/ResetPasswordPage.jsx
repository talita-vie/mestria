// src/pages/ResetPasswordPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api, { initCsrf } from '../services/api';

import AuthLayout                    from '../components/layouts/AuthLayout';
import { PasswordInput }             from '../components/ui/Input';
import Button                        from '../components/ui/Button';
import Link                          from '../components/ui/Link';
import FeatureCard                   from '../components/ui/FeaturedCard';

import loginIllustration from '../assets/reset.svg';

// ── Painel decorativo ──────────────────────────────────────────────────────
const panelCard = (
  <FeatureCard
    icon="shield_lock"
    title="Sua segurança em primeiro lugar"
    body="Crie uma senha forte e única para proteger seu acesso à plataforma Mestria."
  />
);

// ── Página principal ───────────────────────────────────────────────────────
export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    email:           searchParams.get('email') ?? '',
    token:           searchParams.get('token') ?? '',
    password:        '',
    confirmPassword: '',
  });

  const [errors, setErrors]           = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading]         = useState(false);

  // Validar se temos os dados necessários na URL ao carregar
  useEffect(() => {
    if (!form.email || !form.token) {
      setServerError('Link de redefinição inválido ou incompleto. Solicite um novo link.');
    }
  }, [form.email, form.token]);

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (serverError)   setServerError('');
    };
  }

  function validate() {
    const next = {};

    if (!form.email || !form.token) {
      next.general = 'Dados de autenticação ausentes.';
    }

    if (form.password.length < 8) {
      next.password = 'A senha deve ter ao menos 8 caracteres.';
    }

    if (form.confirmPassword !== form.password) {
      next.confirmPassword = 'As senhas não coincidem.';
    }

    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.general) setServerError(validationErrors.general);
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      await initCsrf();
      await api.post('/api/auth/reset-password', {
        email:                 form.email,
        token:                 form.token,
        password:              form.password,
        password_confirmation: form.confirmPassword,
      });

      navigate('/senha-redefinida');
    } catch (error) {
      if (error.response?.status === 422) {
        const apiErrors = error.response.data.errors ?? {};
        setErrors({
          password: apiErrors.password?.[0],
        });
        
        // Se o erro for no token ou email (expirado/inválido)
        if (apiErrors.token || apiErrors.email) {
            setServerError('Este link de redefinição expirou ou é inválido.');
        } else if (!apiErrors.password) {
          setServerError(error.response.data.message ?? 'Erro ao processar solicitação.');
        }
      } else {
        setServerError(
          error.response?.data?.message ?? 'Erro ao conectar. Tente novamente.'
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      imageSrc={loginIllustration}
      imageAlt="Ilustração de redefinição de senha"
      panelCard={panelCard}
    >
      <div className="mb-7">
        <h1 className="text-headline-md text-on-surface mb-1.5">
          Criar nova senha
        </h1>
        <p className="text-body-md text-on-surface-variant">
          {form.email ? (
            <>Redefinindo senha para <strong>{form.email}</strong></>
          ) : (
            'Preencha os campos abaixo para criar uma nova senha.'
          )}
        </p>
      </div>

      {serverError && (
        <div className="mb-4 rounded-lg border border-error/30 bg-error-container/20 px-3.5 py-2.5 text-label-sm text-error">
          {serverError}
        </div>
      )}

      {/* Só mostra o formulário se tiver os dados básicos */}
      {form.email && form.token && (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <PasswordInput
            label="Nova senha"
            placeholder="••••••••"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange('password')}
            error={errors.password}
            showStrength
          />

          <PasswordInput
            label="Confirme a nova senha"
            placeholder="••••••••"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={errors.confirmPassword}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            className="mt-2"
          >
            Redefinir senha
          </Button>
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-body-md text-on-surface-variant">
          Lembrou a senha?{' '}
          <Link href="/login" variant="secondary">
            Voltar ao login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
