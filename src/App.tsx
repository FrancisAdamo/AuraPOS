import { useState, useEffect, useCallback } from 'react';
import { Command } from 'lucide-react';
import Sidebar from './components/Sidebar';
import AlertDashboard from './components/AlertDashboard';
import PointOfSaleTerminal from './components/PointOfSaleTerminal';
import InventoryManagement from './components/InventoryManagement';
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
    <div className="flex h-screen bg-notion-background">
      <header role="banner">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
      </header>
      
      <main role="main" className="flex-1 overflow-y-auto">
        <div className="p-8">
          {activeView === 'dashboard' && <AlertDashboard />}
          {activeView === 'pos' && <PointOfSaleTerminal />}
          {activeView === 'inventory' && <InventoryManagement />}
          {activeView === 'closing' && <CashClosing />}
        </div>
      </main>

      {/* Command Palette - Modal */}
      {showCommand && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="command-palette-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-notion-background/80"
        >
          <div className="notion-card rounded-lg p-6 max-w-2xl w-full mx-4">
            <CommandPalette 
              onClose={() => setShowCommand(false)}
              onSelect={handleCommandSelect}
            />
          </div>
        </div>
      )}

      {/* Aura Brain Assistant - Floating Action */}
      <aside 
        role="complementary" 
        aria-label="Asistente IA Aura Brain" 
        className="fixed bottom-8 right-8 z-40"
      >
        <button
          onClick={() => setShowAuraBrain(!showAuraBrain)}
          className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl cursor-pointer"
          aria-label="Activar asistente Aura Brain"
          aria-expanded={showAuraBrain}
        >
          <span className="text-lg">✨</span>
          <span>Activar Aura Brain</span>
        </button>
      </aside>

      {/* Aura Brain Modal */}
      {showAuraBrain && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="aura-brain-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-notion-background/90 p-4"
        >
          <AuraBrain onClose={() => setShowAuraBrain(false)} />
        </div>
      )}

      {/* Keyboard Shortcut Indicator */}
      <footer 
        role="contentinfo" 
        aria-label="Atajo de teclado"
        className="fixed bottom-8 left-64 flex items-center gap-2 text-notion-secondary text-sm pl-4"
      >
        <Command size={16} aria-hidden="true" />
        <span>+ K para comandos</span>
      </footer>
    </div>
  );
}
