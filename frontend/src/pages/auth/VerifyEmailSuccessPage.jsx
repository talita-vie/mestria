import { useNavigate, useSearchParams} from "react-router-dom";
import { useState, useEffect} from "react";
import api from "../../services/api";
import Button from "../../components/ui/Button";
import AuthSuccessLayout from "../../components/layouts/AuthSuccessLayout";

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

        sessionStorage.removeItem("pending_verification_email");

        setLoading(false);
      } catch {
        setLoading(false);
        setError(true);
      }
    };

    verifyAccount();
  }, [searchParams]);

  if (loading) {
    return (
      <AuthSuccessLayout 
        icon="progress_activity" 
        title="Validando sua conta..." 
        message="Aguarde um momento enquanto confirmamos seus dados."
      >
        <span className="material-symbols-outlined text-on-surface-variant animate-spin text-[48px] mx-auto hidden">
            progress_activity
        </span>
      </AuthSuccessLayout>
    );
  }

  if (error) {
    return (
      <AuthSuccessLayout 
        icon="error" 
        title="Link Inválido" 
        message="O link de verificação expirou ou já foi utilizado. Por favor, solicite um novo e-mail de verificação ou tente fazer login."
        isError={true}
      >
        <Button onClick={() => navigate("/login")} variant="secondary" size="lg" fullWidth>
          Ir para o login
        </Button>
      </AuthSuccessLayout>
    );
  }

  return (
    <AuthSuccessLayout 
      icon="verified" 
      title="Email verificado!" 
      message="Sua conta foi verificada com sucesso. Agora você já pode acessar a plataforma Mestria."
    >
      <Button onClick={() => navigate("/login")} variant="primary" size="lg" fullWidth className="mt-2">
        Ir para o login
      </Button>
    </AuthSuccessLayout>
  );
}
