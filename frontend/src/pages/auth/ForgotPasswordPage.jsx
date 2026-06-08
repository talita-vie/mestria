// src/pages/ForgotPasswordPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { initCsrf } from '@/services/api';

import AuthLayout  from '@/components/layouts/AuthLayout';
import { Input }   from '@/components/ui/Input';
import Button      from '@/components/ui/Button';
import Link        from '@/components/ui/Link';
import FeatureCard from '@/components/ui/FeaturedCard';

import loginIllustration from '@/assets/forgotpassword.svg';

// ── Painel decorativo (coluna direita) ─────────────────────────────────────
const panelCard = (
  <FeatureCard
    icon="lock_reset"
    title="Recupere o acesso"
    body="Informe seu email e enviaremos as instruções para você criar uma nova senha com segurança."
  />
);

const MailIcon = (
  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
    mail
  </span>
);

// ── Página principal ───────────────────────────────────────────────────────
export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail]           = useState('');
  const [errors, setErrors]         = useState({});
  const [loading, setLoading]       = useState(false);
  const [serverError, setServerError] = useState('');

  // ── Handlers ─────────────────────────────────────────────────────────────
  function handleChange(e) {
    setEmail(e.target.value);
    if (errors.email)  setErrors({});
    if (serverError)   setServerError('');
  }

  function validate() {
    const next = {};
    if (!email.trim()) {
      next.email = 'Email é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Insira um email válido.';
    }
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      await initCsrf();
      await api.post('/api/auth/forgot-password', { email });
      navigate('/email-enviado');
    } catch (error) {
      if (error.response?.status === 422) {
        const apiErrors = error.response.data.errors ?? {};
        setErrors({ email: apiErrors.email?.[0] });
      } else {
        setServerError(
          error.response?.data?.message ?? 'Erro ao conectar. Tente novamente.'
        );
      }
    } finally {
      setLoading(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <AuthLayout
      imageSrc={loginIllustration}
      imageAlt="Ilustração de recuperação de senha"
      panelCard={panelCard}
    >
      {/* Cabeçalho */}
      <div className="mb-7">
        <h1 className="text-headline-md text-on-surface mb-1.5">
          Esqueceu a senha?
        </h1>
        <p className="text-body-md text-on-surface-variant">
          Informe o email cadastrado e enviaremos um link para você criar
          uma nova senha.
        </p>
      </div>

      {/* Erro de servidor */}
      {serverError && (
        <div className="mb-4 rounded-lg border border-error/30 bg-error-container/20 px-3.5 py-2.5 text-label-sm text-error">
          {serverError}
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="joao.silva@exemplo.com.br"
          autoComplete="email"
          leftAddon={MailIcon}
          value={email}
          onChange={handleChange}
          error={errors.email}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          className="mt-1"
        >
          Enviar instruções
        </Button>
      </form>

      {/* Rodapé */}
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
