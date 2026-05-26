// src/pages/VerifyEmailPage.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";

import Button from "../components/ui/Button";
import Link   from "../components/ui/Link";

export default function VerifyEmailPage() {

  const { state } = useLocation();
  const email =
    state?.email ||
    sessionStorage.getItem("pending_verification_email") ||
    "";

  const [resending, setResending]     = useState(false);
  const [resent, setResent]           = useState(false);
  const [resendError, setResendError] = useState("");

  async function handleResend() {
    if (!email) {
      setResendError(
        "Não foi possível identificar o email. Volte ao cadastro e tente novamente."
      );
      return;
    }

    setResending(true);
    setResent(false);
    setResendError("");

    try {
      await api.post("/api/auth/email/resend", { email });
      setResent(true);
    } catch (error) {
      setResendError(
        error.response?.data?.message ?? "Erro ao reenviar. Tente novamente."
      );
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-container-low text-on-surface overflow-hidden">
      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-margin-mobile md:px-margin-desktop py-10 relative">

        {/* Card */}
        <section
          className="
            relative z-10
            w-full max-w-[480px]
            bg-surface-container-lowest
            border border-outline-variant/30
            rounded-xl
            shadow-[0_4px_20px_rgba(0,0,0,0.04)]
            overflow-hidden
          "
        >
          <div className="px-8 py-10 md:px-10 flex flex-col items-center text-center">

            {/* Icon */}
            <div className="relative mb-8">
              <div
                className="
                  w-16 h-16
                  rounded-full
                  bg-surface-container
                  border border-outline-variant/20
                  shadow-sm
                  flex items-center justify-center
                  relative z-10
                "
              >
                <span
                  className="material-symbols-outlined text-primary-container"
                  style={{
                    fontSize: 32,
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  mark_email_read
                </span>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 bg-primary-container/20 blur-xl rounded-full" />
            </div>

            {/* Heading */}
            <h1 className="text-headline-lg text-on-surface tracking-tight mb-4">
              Verifique seu email
            </h1>

            {/* Description */}
            <p className="text-body-md text-on-surface-variant max-w-[360px] mb-2 leading-relaxed">
              Enviamos um link de verificação para o seu email. Por favor, clique no link
              para verificar sua conta e acessar a plataforma.
            </p>

            {/* Feedback de reenvio bem-sucedido */}
            {resent && (
              <div className="w-full mb-4 rounded-lg border border-outline-variant/30 bg-surface-container px-4 py-3 flex items-center gap-2 text-body-sm text-on-surface-variant">
                <span
                  className="material-symbols-outlined text-primary-container shrink-0"
                  style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                E-mail reenviado com sucesso! Verifique sua caixa de entrada.
              </div>
            )}

            {/* Erro de reenvio */}
            {resendError && (
              <div className="w-full mb-4 rounded-lg border border-error/30 bg-error-container/20 px-4 py-3 text-body-sm text-error">
                {resendError}
              </div>
            )}

            {/* Actions */}
            <div className="w-full flex flex-col gap-4">
              <Button
                onClick={handleResend}
                variant="primary"
                size="lg"
                fullWidth
                loading={resending}
                disabled={resent || !email}
                className="mt-2"
              >
                {resent ? "Email reenviado" : "Reenviar email"}
              </Button>
            </div>

            {/* Footer Link */}
            <div className="w-full mt-8 pt-6 border-t border-outline-variant/20">
              <Link
                href="/cadastro"
                variant="subtle"
                className="
                  inline-flex items-center gap-1
                  text-label-sm
                  group
                "
              >
                <span
                  className="
                    material-symbols-outlined
                    text-[16px]
                    transition-transform
                    group-hover:-translate-x-1
                  "
                >
                  arrow_back
                </span>
                Voltar para cadastro
              </Link>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}