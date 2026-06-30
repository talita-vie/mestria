// src/pages/ForgotPasswordSuccessPage.jsx
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import AuthSuccessLayout from "@/components/layouts/AuthSuccessLayout";

export default function ForgotPasswordSuccessPage() {
  const navigate = useNavigate();

  return (
    <AuthSuccessLayout 
      icon="mark_email_read" 
      title="Email enviado!" 
      message="Se este endereço estiver cadastrado, você receberá as instruções para redefinir sua senha em breve. Verifique também sua caixa de spam."
    >
      <Button
        onClick={() => navigate("/login")}
        variant="primary"
        size="lg"
        fullWidth
        className="mt-2"
      >
        Voltar para o login
      </Button>
    </AuthSuccessLayout>
  );
}
