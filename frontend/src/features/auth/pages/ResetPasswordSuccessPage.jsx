// src/pages/ResetPasswordSuccessPage.jsx
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import AuthSuccessLayout from "@/components/layouts/AuthSuccessLayout";

export default function ResetPasswordSuccessPage() {
  const navigate = useNavigate();

  return (
    <AuthSuccessLayout
      icon="lock_open"
      title="Senha redefinida!"
      message="Sua senha foi alterada com sucesso. Você já pode fazer login com a nova senha."
    >
      <Button
        onClick={() => navigate("/login")}
        variant="primary"
        size="lg"
        fullWidth
        className="mt-2"
      >
        Ir para o login
      </Button>
    </AuthSuccessLayout>
  );
}