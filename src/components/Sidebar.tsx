import { BarChart3, Boxes, Zap, LogOut, HelpCircle, UserCircle, Power } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.tsx';
import { PERMISSIONS } from '../types/auth';

export default function Sidebar() {
  const { hasPermission, user, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  
  const allMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, permission: PERMISSIONS.VIEW_DASHBOARD, to: '/dashboard' },
    { id: 'pos', label: 'Ventas (POS)', icon: Zap, permission: PERMISSIONS.VIEW_POS, to: '/pos' },
    { id: 'inventory', label: 'Inventario', icon: Boxes, permission: PERMISSIONS.VIEW_INVENTORY, to: '/inventory' },
    { id: 'closing', label: 'Cierre de caja', icon: LogOut, permission: PERMISSIONS.VIEW_CLOSING, to: '/closing' },
    { id: 'help', label: 'Ayuda', icon: HelpCircle, permission: null, to: '/help' }, // Accesible para todos
  ];

  // Filtrar items según permisos del usuario
  const menuItems = allMenuItems.filter(item => 
    item.permission === null || hasPermission(item.permission)
  );

  return (
    <aside className="w-64 border-r border-notion-border bg-notion-background flex flex-col font-sans">
      {/* Header */}
      <header className="p-6 border-b border-notion-border">
        <h1 className="text-2xl font-bold text-notion-primary m-0">
          Aura<span className="text-purple-500">POS</span>
        </h1>
        <p className="text-sm text-notion-secondary mt-1 m-0">
          ERP de próxima generación
        </p>
      </header>

      {/* Navigation */}
      <nav 
        role="navigation" 
        aria-label="Navegación principal"
        className="flex-1 p-6 flex flex-col gap-2"
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }: { isActive: boolean }) => `w-full flex items-center gap-3 p-3 rounded-sm font-medium text-base transition-all duration-200 border-none cursor-pointer ${
                isActive
                  ? 'bg-blue-100 text-blue-600 border-l-2 border-l-blue-600 pl-4'
                  : 'bg-transparent text-notion-primary hover:bg-notion-hover'
              }`}
              aria-label={`Navegar a ${item.label}`}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <footer 
        role="contentinfo" 
        className="p-6 border-t border-notion-border text-notion-secondary text-sm flex flex-col gap-4"
      >
        {/* Role Selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-notion-primary font-medium">
            <UserCircle size={16} />
            <span>Rol: {user?.role === 'owner' ? 'Dueño' : 'Vendedor'}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => switchRole('owner')}
              className={`flex-1 py-1 px-2 rounded text-xs transition-colors ${
                user?.role === 'owner' 
                  ? 'bg-purple-100 text-purple-700 font-bold' 
                  : 'bg-notion-hover text-notion-secondary'
              }`}
            >
              Dueño
            </button>
            <button
              onClick={() => switchRole('vendor')}
              className={`flex-1 py-1 px-2 rounded text-xs transition-colors ${
                user?.role === 'vendor' 
                  ? 'bg-blue-100 text-blue-700 font-bold' 
                  : 'bg-notion-hover text-notion-secondary'
              }`}
            >
              Vendedor
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="flex items-center gap-2 w-full p-2 rounded text-xs text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          aria-label="Cerrar sesión"
        >
          <Power size={14} />
          <span>Cerrar Sesión</span>
        </button>

        <div className="flex flex-col gap-1 opacity-60">
          <p className="m-0">Versión 1.0.0</p>
          <p className="m-0">© 2026 AuraPOS</p>
        </div>
      </footer>
    </aside>
  );
}
