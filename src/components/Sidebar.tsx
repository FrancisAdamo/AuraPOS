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
    <aside style={{
      width: '16rem',
      borderRight: '1px solid #e5e5e5',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #e5e5e5',
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#37352f',
          margin: 0,
        }}>
          Aura<span style={{ color: '#a855f7' }}>POS</span>
        </h1>
        <p style={{
          fontSize: '0.875rem',
          color: '#9ca3af',
          marginTop: '0.25rem',
          margin: 0,
        }}>ERP de próxima generación</p>
      </div>

      {/* Navigation */}
      <nav style={{
        flex: 1,
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.125rem',
                border: 'none',
                backgroundColor: isActive ? '#dbeafe' : 'transparent',
                color: isActive ? '#2563eb' : '#37352f',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                borderLeft: isActive ? '2px solid #2563eb' : 'none',
                paddingLeft: isActive ? 'calc(1rem - 2px)' : '1rem',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '1.5rem',
        borderTop: '1px solid #e5e5e5',
        fontSize: '0.75rem',
        color: '#9ca3af',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}>
        <p style={{ margin: 0 }}>Versión 1.0.0</p>
        <p style={{ margin: 0 }}>© 2026 AuraPOS - All rights reserved</p>
      </div>
    </aside>
  );
}
