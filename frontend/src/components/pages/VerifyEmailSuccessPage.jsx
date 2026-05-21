import { useNavigate, useSearchParams} from "react-router-dom";
import { useState, useEffect} from "react";
import api from "../../services/api";

import Button from "../ui/Button";

export default function VerifyEmailSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] =useState(true);
  const [error, setError] = useState(false);
 
  useEffect(() => {
    const verifyAccount = async () => {
      const id        = searchParams.get('id');
      const hash      = searchParams.get('hash');
      const expires   = searchParams.get('expires');
      const signature = searchParams.get('signature');

      if (!id || !hash || !expires || !signature) {
        setLoading(false);
        setError(true);
        return;
      }

      const params = new URLSearchParams({ expires, signature });
      const backendPath = `/api/auth/email/verify/${id}/${hash}?${params}`;

      try {
        await api.get(backendPath);
        setLoading(false);
      } catch {
        setLoading(false);
        setError(true);
      }
    };

    verifyAccount();
  }, [searchParams]);

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

            {loading && (
              <div className="py-8">
                <span className="material-symbols-outlined text-on-surface-variant animate-spin text-[48px] mb-4">
                  progress_activity
                </span>
                <h1 className="text-headline-sm text-on-surface">Validando sua conta...</h1>
              </div>
            )}

            {error && !loading && (
              <>
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-full bg-error-container border border-error/20 flex items-center justify-center relative z-10">
                    <span className="material-symbols-outlined text-error" style={{ fontSize: 32, fontVariationSettings: "'FILL' 1" }}>
                      error
                    </span>
                  </div>
                </div>
                <h1 className="text-headline-lg md:text-headline-lg text-on-surface tracking-tight mb-4">
                  Link Inválido
                </h1>
                <p className="text-body-md text-on-surface-variant max-w-[360px] mb-8 leading-relaxed">
                  O link de verificação expirou ou já foi utilizado. Por favor, solicite um novo e-mail de verificação ou tente fazer login.
                </p>
                <div className="w-full flex flex-col gap-4">
                  <Button onClick={() => navigate("/login")} variant="secondary" size="lg" fullWidth>
                    Ir para o login
                  </Button>
                </div>
              </>
            )}

            {!loading && !error && (
              <>
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-full bg-surface-container border border-outline-variant/20 shadow-sm flex items-center justify-center relative z-10">
                    <span className="material-symbols-outlined text-primary-container" style={{ fontSize: 32, fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-primary-container/20 blur-xl rounded-full" />
                </div>
                <h1 className="text-headline-lg md:text-headline-lg text-on-surface tracking-tight mb-4">
                  Email verificado!
                </h1>
                <p className="text-body-md text-on-surface-variant max-w-[360px] mb-8 leading-relaxed">
                  Sua conta foi verificada com sucesso. Agora você já pode acessar a plataforma Mestria.
                </p>
                <div className="w-full flex flex-col gap-4">
                  <Button onClick={() => navigate("/login")} 
                          variant="primary" 
                          size="lg" 
                          fullWidth className="mt-2">
                    Ir para o login
                  </Button>
                </div>
              </>
            )}
        
          </div>
        </section>
      </main>
    </div>
  );
}