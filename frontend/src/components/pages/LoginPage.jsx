// src/components/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../contexts/AuthContext";

import AuthLayout  from "../layouts/AuthLayout";
import { Input, PasswordInput } from "../ui/Input";
import Button      from "../ui/Button";
import Link        from "../ui/Link";
import Checkbox    from "../ui/Checkbox";
import FeatureCard  from "../ui/FeaturedCard";

import loginIllustration from "../../assets/login_illustration.svg";

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

  // ── Handlers ───────────────────────────────────────────────────────────
  function handleChange(field) {
    return (e) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field])  setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (serverError)    setServerError("");
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
        setErrors({
          email:    apiErrors.email?.[0],
          password: apiErrors.password?.[0],
        });
      } else {
        setServerError(
          error.response?.data?.message ?? "Erro ao conectar. Tente novamente."
        );
      }
    } finally {
      setLoading(false);
    }
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
          <Link href="/forgot-password" variant="secondary" className="text-label-md shrink-0">
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
