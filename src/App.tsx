import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Command } from 'lucide-react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.tsx';
import Sidebar from './components/Sidebar';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import CommandPalette from './components/CommandPalette';
import AuraBrain from './components/AuraBrain';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PERMISSIONS } from './types/auth';
import LoginPage from './pages/LoginPage';

// Lazy loading de componentes pesados
const AlertDashboard = lazy(() => import('./components/AlertDashboard'));
const PointOfSaleTerminal = lazy(() => import('./components/PointOfSaleTerminal'));
const InventoryManagement = lazy(() => import('./components/InventoryManagement'));
const CashClosing = lazy(() => import('./components/CashClosing'));
const HelpPage = lazy(() => import('./components/HelpPage'));

function AppLayout() {
  const navigate = useNavigate();

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
    const routeByCommand: Record<string, string> = {
      dashboard: '/dashboard',
      pos: '/pos',
      inventory: '/inventory',
      closing: '/closing',
      help: '/help',
    };

    const route = routeByCommand[command];
    if (route) {
      navigate(route);
    }
    setShowCommand(false);
  }, [navigate]);

  return (
    <div className="flex h-screen bg-notion-background">
      <header role="banner">
        <Sidebar />
      </header>
      
      <main role="main" className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_DASHBOARD}>
                    <AlertDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pos"
                element={
                  <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_POS}>
                    <PointOfSaleTerminal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory"
                element={
                  <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_INVENTORY}>
                    <InventoryManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/closing"
                element={
                  <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_CLOSING}>
                    <CashClosing />
                  </ProtectedRoute>
                }
              />
              <Route path="/help" element={<HelpPage />} />

              <Route path="/" element={<Navigate to="/pos" replace />} />
              <Route path="*" element={<Navigate to="/pos" replace />} />
            </Routes>
          </Suspense>
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
          className="flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-all duration-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl cursor-pointer"
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
        className="fixed bottom-8 left-64 flex items-center gap-2 text-notion-secondary text-sm pl-4 z-30"
      >
        <Command size={16} aria-hidden="true" />
        <span>+ K para comandos</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    </AuthProvider>
  );
}
