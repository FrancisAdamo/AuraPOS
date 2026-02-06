import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface WidgetLayout {
  id: string;
  position: number;
  isCollapsed: boolean;
}

interface DashboardLayoutContextType {
  widgets: WidgetLayout[];
  updateWidgetPosition: (id: string, newPosition: number) => void;
  toggleWidgetCollapse: (id: string) => void;
  resetLayout: () => void;
}

const DashboardLayoutContext = createContext<DashboardLayoutContextType | undefined>(undefined);

const DEFAULT_WIDGETS: WidgetLayout[] = [
  { id: 'top-products', position: 0, isCollapsed: false },
  { id: 'stock-alert', position: 1, isCollapsed: false },
  { id: 'sales-chart', position: 2, isCollapsed: false },
];

export function DashboardLayoutProvider({ children }: { children: ReactNode }) {
  const [widgets, setWidgets] = useState<WidgetLayout[]>(() => {
    const saved = localStorage.getItem('aurapos_dashboard_layout');
    return saved ? JSON.parse(saved) : DEFAULT_WIDGETS;
  });

  const updateWidgetPosition = useCallback((id: string, newPosition: number) => {
    setWidgets(prev => {
      const newWidgets = [...prev];
      const widgetIndex = newWidgets.findIndex(w => w.id === id);
      
      if (widgetIndex === -1) return prev;
      
      const [widget] = newWidgets.splice(widgetIndex, 1);
      newWidgets.splice(newPosition, 0, widget);
      
      // Reassign positions
      const updatedWidgets = newWidgets.map((w, index) => ({
        ...w,
        position: index
      }));
      
      localStorage.setItem('aurapos_dashboard_layout', JSON.stringify(updatedWidgets));
      return updatedWidgets;
    });
  }, []);

  const toggleWidgetCollapse = useCallback((id: string) => {
    setWidgets(prev => {
      const updatedWidgets = prev.map(w =>
        w.id === id ? { ...w, isCollapsed: !w.isCollapsed } : w
      );
      localStorage.setItem('aurapos_dashboard_layout', JSON.stringify(updatedWidgets));
      return updatedWidgets;
    });
  }, []);

  const resetLayout = useCallback(() => {
    setWidgets(DEFAULT_WIDGETS);
    localStorage.setItem('aurapos_dashboard_layout', JSON.stringify(DEFAULT_WIDGETS));
  }, []);

  const contextValue: DashboardLayoutContextType = {
    widgets,
    updateWidgetPosition,
    toggleWidgetCollapse,
    resetLayout
  };

  return (
    <DashboardLayoutContext.Provider value={contextValue}>
      {children}
    </DashboardLayoutContext.Provider>
  );
}

export function useDashboardLayout(): DashboardLayoutContextType {
  const context = useContext(DashboardLayoutContext);
  if (context === undefined) {
    throw new Error('useDashboardLayout must be used within a DashboardLayoutProvider');
  }
  return context;
}
