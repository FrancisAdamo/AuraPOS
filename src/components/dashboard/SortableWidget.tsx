import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AnalyticsWidget } from './AnalyticsWidget';
import { useDashboardLayout } from '../../hooks/useDashboardLayout';
import type { ExportData } from '../../hooks/useReportExport';

interface SortableWidgetProps {
  id: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  exportData?: ExportData;
}

export function SortableWidget({ id, children, isCollapsed, exportData }: SortableWidgetProps) {
  const { toggleWidgetCollapse } = useDashboardLayout();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`touch-none ${isDragging ? 'z-50' : 'z-0'}`}
    >
      <AnalyticsWidget
        title={getWidgetTitle(id)}
        isCollapsible
        isCollapsed={isCollapsed}
        onToggleCollapse={() => toggleWidgetCollapse(id)}
        exportData={exportData}
        className={`cursor-move ${isDragging ? 'shadow-2xl scale-105' : 'hover:shadow-lg transition-shadow'}`}
      >
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          {children}
        </div>
      </AnalyticsWidget>
    </div>
  );
}

function getWidgetTitle(id: string): string {
  switch (id) {
    case 'top-products':
      return 'Top 5 Productos';
    case 'stock-alert':
      return 'Alertas de Stock';
    case 'sales-chart':
      return 'Análisis de Ventas';
    default:
      return 'Widget';
  }
}
