import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import AuthLayout   from '../components/layouts/AuthLayout';
import { Input, PasswordInput } from '../components/ui/Input';
import Button       from '../components/ui/Button';
import Link         from '../components/ui/Link';
import FeatureCard  from '../components/ui/FeaturedCard';

import registerIllustration from '../assets/register.svg';

const panelCard = (
  <FeatureCard
    icon="auto_graph"
    title="Conhecimento Acelerado"
    body="Nosso currículo estruturado e interface minimalista são projetados com precisão para reduzir a carga cognitiva, permitindo que você se concentre inteiramente em um aprendizado profundo."
  />
);

const ArrowIcon = (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: 16, fontVariationSettings: "'wght' 600" }}
  >
    arrow_forward
  </span>
);

export default function RegisterPage() {
  const navigate      = useNavigate();
  const { register }  = useAuth();

  const [form, setForm] = useState({
    name:            '',
    email:           '',
    password:        '',
    confirmPassword: '',
  });
  const [errors, setErrors]           = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading]         = useState(false);

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (serverError)   setServerError('');
    };
  }

  function validate() {
    const next = {};
    if (!form.name.trim())  next.name  = 'Nome é obrigatório.';
    if (!form.email.trim()) next.email = 'Email é obrigatório.';
    if (form.password.length < 8)
      next.password = 'A senha deve ter ao menos 8 caracteres.';
    if (form.confirmPassword !== form.password)
      next.confirmPassword = 'Senhas diferentes.';
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
      await register({
        name:                  form.name,
        email:                 form.email,
        password:              form.password,
        password_confirmation: form.confirmPassword,
      });

      sessionStorage.setItem("pending_verification_email", form.email);

      navigate('/verificar-email', { state: { email: form.email } });

    } catch (error) {
      if (error.response?.status === 422) {
        const apiErrors = error.response.data.errors ?? {};
        setErrors({
          name:     apiErrors.name?.[0],
          email:    apiErrors.email?.[0],
          password: apiErrors.password?.[0],
        });
      } else {
        setServerError(
          error.response?.data?.message ?? 'Erro ao criar conta. Tente novamente.'
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      imageSrc={registerIllustration}
      imageAlt="Ilustração de biblioteca e aprendizado"
      panelCard={panelCard}
    >
      <div className="mb-7">
        <h1 className="text-headline-md text-on-surface mb-1.5">Crie sua conta</h1>
        <p className="text-body-md text-on-surface-variant">
          Insira seus dados para iniciar seu programa de aprendizado e acessar
          conteúdo acadêmico de alto desempenho.
        </p>
      </div>

      {serverError && (
        <div className="mb-3 rounded-lg border border-error/30 bg-error-container/20 px-3.5 py-2.5 text-label-sm text-error">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          label="Nome"
          type="text"
          placeholder="João Silva"
          autoComplete="name"
          value={form.name}
          onChange={handleChange('name')}
          error={errors.name}
        />
        <Input
          label="Endereço de Email"
          type="email"
          placeholder="joao.silva@exemplo.com.br"
          autoComplete="email"
          value={form.email}
          onChange={handleChange('email')}
          error={errors.email}
        />
        <PasswordInput
          label="Senha"
          placeholder="••••••••"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange('password')}
          error={errors.password}
          showStrength
        />
        <PasswordInput
          label="Confirme a Senha"
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
          rightIcon={ArrowIcon}
          loading={loading}
          className="mt-2"
        >
          Comece a aprender
        </Button>
      </form>

      <div className="mt-7 text-center border-t border-outline-variant/20 pt-6">
        <p className="text-body-md text-on-surface-variant">
          Já tem uma conta?{' '}
          <Link href="/login" variant="secondary">Log in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
