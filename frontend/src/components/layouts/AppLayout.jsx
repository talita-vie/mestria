import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/shared/Sidebar";

export default function AppLayout() {
  const { user, logout } = useAuth();

  const links = [
    { to: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { to: "/cursos", icon: "school", label: "Meus Cursos" },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar
        links={links}
        role={user?.role || "Usuário"}
        user={{
          name: user?.name,
          email: user?.email,
          initial: user?.name?.charAt(0).toUpperCase() || "U",
        }}
        onLogout={logout}
      />

      <div className="flex-1 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
}