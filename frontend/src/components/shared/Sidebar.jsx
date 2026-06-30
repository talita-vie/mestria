// src/components/shared/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import logo from '@/assets/mestria-logo.png';

const instructorLinks = [
  { to: '/dashboard',          icon: 'dashboard',      label: 'Dashboard' },
  { to: '/instrutor/cursos',   icon: 'school',         label: 'Meus Cursos' },
];

const adminLinks = [
  { to: '/dashboard',      icon: 'dashboard',    label: 'Dashboard' },
  { to: '/admin/usuarios', icon: 'group',        label: 'Usuários' },
  { to: '/admin/categorias', icon: 'category',   label: 'Categorias' },
];

const studentLinks = [
  { to: '/dashboard',   icon: 'dashboard',  label: 'Dashboard' },
  { to: '/cursos',      icon: 'school',     label: 'Cursos' },
];

function roleLinks(user) {
  if (user?.roles?.includes('admin'))       return adminLinks;
  if (user?.roles?.includes('instructor'))  return instructorLinks;
  return studentLinks;
}

function roleLabel(user) {
  if (user?.roles?.includes('admin'))       return 'Administrador';
  if (user?.roles?.includes('instructor'))  return 'Instrutor';
  return 'Aluno';
}

export default function Sidebar() {
  const { user, logout } = useAuth();
  const links = roleLinks(user);

  return (
    <aside className="
      hidden md:flex flex-col
      fixed left-0 top-0 h-screen w-64
      bg-surface border-r border-outline-variant/30
      z-20
    ">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-outline-variant/30">
        <img src={logo} alt="Mestria" className="h-8 w-auto" />
        <p className="text-label-sm text-on-surface-variant mt-1.5 uppercase tracking-widest">
          {roleLabel(user)}
        </p>
      </div>

      {/* Links de navegação */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => [
              'flex items-center gap-3 px-3 py-2.5 rounded-lg',
              'text-label-md transition-colors duration-150 group',
              isActive
                ? 'bg-primary-container text-primary font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface',
            ].join(' ')}
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-[20px] shrink-0"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {icon}
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Rodapé: usuário + logout */}
      <div className="px-3 py-4 border-t border-outline-variant/30">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
            <span className="text-label-sm text-primary font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-label-md text-on-surface truncate">{user?.name}</p>
            <p className="text-label-sm text-on-surface-variant truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="
            flex items-center gap-3 w-full px-3 py-2.5 rounded-lg
            text-label-md text-on-surface-variant
            hover:bg-error-container/30 hover:text-error
            transition-colors duration-150
          "
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Sair
        </button>
      </div>
    </aside>
  );
}