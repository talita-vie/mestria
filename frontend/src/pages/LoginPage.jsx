// src/components/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../contexts/AuthContext";

import AuthLayout  from "../components/layouts/AuthLayout";
import { Input, PasswordInput } from "../components/ui/Input";
import Button      from "../components/ui/Button";
import Link        from "../components/ui/Link";
import Checkbox    from "../components/ui/Checkbox";
import FeatureCard  from "../components/ui/FeaturedCard";

import loginIllustration from "../assets/login.svg";

const panelCard = (
  <FeatureCard
    icon="auto_graph"
    title="Aprendizado Acelerado"
    body="Nosso currículo estruturado e interface minimalista são projetados com precisão para otimizar seu aprendizado."
  />
);

const MailIcon = (
  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
    mail
  </span>
);

const LockIcon = (
  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
    lock
  </span>
);

export default function LoginPage() {
  const navigate    = useNavigate();
  const { login }   = useAuth(); 

  const [form, setForm]             = useState({ email: "", password: "", remember: false });
  const [errors, setErrors]         = useState({});
  const [loading, setLoading]       = useState(false);
  const [serverError, setServerError] = useState("");
  const [showResend, setShowResend] = useState(false);

  // ── Handlers ───────────────────────────────────────────────────────────
  function handleChange(field) {
    return (e) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field])  setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (serverError)    setServerError("");
      if (showResend)     setShowResend(false);
    };
  }

  function validate() {
    const next = {};
    if (!form.email.trim()) next.email    = "Email é obrigatório.";
    if (!form.password)     next.password = "Senha é obrigatória.";
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
    setShowResend(false);

    try {
      await login({
        email:    form.email,
        password: form.password,
        remember: form.remember,
      });

      navigate("/dashboard");

     } catch (error) {
      if (error.response?.status === 422) {
        const apiErrors = error.response.data.errors ?? {};
        const emailError = apiErrors.email?.[0];
 
        if (emailError === "Confirme seu email antes de fazer login.") {
          setErrors({
            email: "Você precisa verificar seu email antes de fazer login.",
          });
          setShowResend(true);
        } else {
          setErrors({
            email:    emailError,
            password: apiErrors.password?.[0],
          });
        }
      } else {
        setServerError(
          error.response?.data?.message ?? "Erro ao conectar. Tente novamente."
        );
      }
    } finally {
      setLoading(false);
    }
  }
 
  function handleGoToResend() {
    navigate("/verificar-email", { state: { email: form.email } });
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <AuthLayout
      imageSrc={loginIllustration}
      imageAlt="Ilustração de aprendizado online"
      panelCard={panelCard}
      panelCardPosition="bottom-left"
    >
      {/* Cabeçalho */}
      <div className="mb-7">
        <h1 className="text-headline-md text-on-surface mb-1.5">Bem vindo/a de volta!</h1>
        <p className="text-body-md text-on-surface-variant">
          Por favor insira suas credenciais para acessar nossos cursos.
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
          value={form.email}
          onChange={handleChange("email")}
          error={errors.email}
        />

      {showResend && (
          <button
            type="button"
            onClick={handleGoToResend}
            className="
              -mt-2 self-start
              inline-flex items-center gap-1
              text-label-sm text-primary
              underline underline-offset-2
              hover:text-primary/80
              transition-colors
            "
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
              mail
            </span>
            Reenviar email de verificação
          </button>
        )}

        <PasswordInput
          label="Senha"
          placeholder="••••••••"
          autoComplete="current-password"
          leftAddon={LockIcon}
          value={form.password}
          onChange={handleChange("password")}
          error={errors.password}
        />

        {/* Linha: lembrar + esqueci senha */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Me mantenha logado"
            checked={form.remember}
            onChange={handleChange("remember")}
          />
          <Link href="/esqueci-senha" variant="secondary" className="text-label-md shrink-0">
            Esqueceu a senha?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          className="mt-1"
        >
          Entrar
        </Button>
      </form>

      {/* Rodapé */}
      <div className="mt-6 text-center">
        <p className="text-body-md text-on-surface-variant">
          Não tem uma conta?{" "}
          <Link href="/cadastro" variant="primary">
            Registrar
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
