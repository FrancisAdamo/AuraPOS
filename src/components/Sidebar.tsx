import { BarChart3, Boxes, Zap, LogOut } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'pos', label: 'Ventas (POS)', icon: Zap },
    { id: 'inventory', label: 'Inventario', icon: Boxes },
    { id: 'closing', label: 'Cierre de caja', icon: LogOut },
  ];

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
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-sm font-medium text-base transition-all duration-200 border-none cursor-pointer ${
                isActive 
                  ? 'bg-blue-100 text-blue-600 border-l-2 border-l-blue-600 pl-4' 
                  : 'bg-transparent text-notion-primary hover:bg-notion-hover'
              }`}
              aria-current={isActive}
              aria-label={`Navegar a ${item.label}`}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <footer 
        role="contentinfo" 
        className="p-6 border-t border-notion-border text-notion-secondary text-sm flex flex-col gap-2"
      >
        <p className="m-0">Versión 1.0.0</p>
        <p className="m-0">© 2026 AuraPOS - All rights reserved</p>
      </footer>
    </aside>
  );
}
