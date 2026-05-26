// src/pages/ResetPasswordSuccessPage.jsx
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function ResetPasswordSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-surface-container-low text-on-surface overflow-hidden">
      <main className="flex-1 flex items-center justify-center px-margin-mobile md:px-margin-desktop py-10 relative">
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
            <div className="relative mb-8">
              <div className="w-16 h-16 rounded-full bg-surface-container border border-outline-variant/20 shadow-sm flex items-center justify-center relative z-10">
                <span
                  className="material-symbols-outlined text-primary-container"
                  style={{ fontSize: 32, fontVariationSettings: "'FILL' 1" }}
                >
                  lock_open
                </span>
              </div>
              <div className="absolute inset-0 bg-primary-container/20 blur-xl rounded-full" />
            </div>

            <h1 className="text-headline-lg md:text-headline-lg text-on-surface tracking-tight mb-4">
              Senha redefinida!
            </h1>
            <p className="text-body-md text-on-surface-variant max-w-[360px] mb-8 leading-relaxed">
              Sua senha foi alterada com sucesso. Você já pode fazer login com a nova
              senha.
            </p>

            <div className="w-full flex flex-col gap-4">
              <Button
                onClick={() => navigate("/login")}
                variant="primary"
                size="lg"
                fullWidth
                className="mt-2"
              >
                Ir para o login
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
