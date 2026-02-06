import { DashboardLayoutProvider } from '../hooks/useDashboardLayout';
import { DragDropDashboard, TimeFilterSelector } from './dashboard';

export default function AlertDashboard() {
  return (
    <DashboardLayoutProvider>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-notion-primary m-0">
            Dashboard Analítico
          </h1>
          <p className="text-notion-secondary mt-1">
            Monitorea el rendimiento de tu negocio en tiempo real
          </p>
        </div>
        
        <TimeFilterSelector />
        
        <DragDropDashboard />
      </div>
    </DashboardLayoutProvider>
  );
}
