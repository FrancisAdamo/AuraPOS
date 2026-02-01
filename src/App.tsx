import { useState, useEffect, useCallback } from 'react';
import { Command } from 'lucide-react';
import Sidebar from './components/Sidebar';
import AlertDashboard from './components/AlertDashboard';
import POSModule from './components/POSModule';
import InventoryModule from './components/InventoryModule';
import CashClosing from './components/CashClosing';
import CommandPalette from './components/CommandPalette';
import AuraBrain from './components/AuraBrain';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [showCommand, setShowCommand] = useState(false);
  const [showAuraBrain, setShowAuraBrain] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommand(!showCommand);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCommand]);

  const handleCommandSelect = useCallback((command: string) => {
    setActiveView(command);
    setShowCommand(false);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'white' }}>
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '2rem' }}>
          {activeView === 'dashboard' && <AlertDashboard />}
          {activeView === 'pos' && <POSModule />}
          {activeView === 'inventory' && <InventoryModule />}
          {activeView === 'closing' && <CashClosing />}
        </div>
      </main>

      {/* Command Palette */}
      {showCommand && (
        <CommandPalette 
          onClose={() => setShowCommand(false)}
          onSelect={handleCommandSelect}
        />
      )}

      {/* Aura Brain Button */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 40 }}>
        <button
          onClick={() => setShowAuraBrain(!showAuraBrain)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: 'linear-gradient(to right, rgb(168, 85, 247), rgb(236, 72, 153))',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            fontWeight: 500,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.15)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)')}
        >
          <span style={{ fontSize: '1.125rem' }}>✨</span>
          <span>Activar Aura Brain</span>
        </button>
      </div>

      {/* Aura Brain Modal */}
      {showAuraBrain && (
        <AuraBrain onClose={() => setShowAuraBrain(false)} />
      )}

      {/* Keyboard Shortcut Indicator */}
      <div style={{ position: 'fixed', bottom: '2rem', left: '16rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.875rem', paddingLeft: '1rem' }}>
        <Command size={16} />
        <span>+ K para comandos</span>
      </div>
    </div>
  );
}
