import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { useDashboardLayout } from '../../hooks/useDashboardLayout';
import { useTimeFilter } from '../../hooks/useTimeFilter';
import { TopProductsWidget } from './TopProductsWidget';
import { StockAlertWidget } from './StockAlertWidget';
import { SalesChart } from './SalesChart';
import { SortableWidget } from './SortableWidget';
import type { ExportData } from '../../hooks/useReportExport';

// Mock data para demostración
const MOCK_TOP_PRODUCTS = [
  { id: '1', name: 'Proteína Whey Vainilla 1kg', quantity: 45, revenue: 134550, trend: 'up' as const },
  { id: '2', name: 'Creatina Monohidrato 300g', quantity: 32, revenue: 64000, trend: 'up' as const },
  { id: '3', name: 'BCAA Limón 250g', quantity: 28, revenue: 55860, trend: 'stable' as const },
  { id: '4', name: 'Colágeno Hidrolizado 300g', quantity: 22, revenue: 43780, trend: 'down' as const },
  { id: '5', name: 'Multivitamínico 60 cápsulas', quantity: 18, revenue: 35820, trend: 'up' as const },
];

const MOCK_STOCK_ALERTS = [
  { id: '1', name: 'BCAA Limón 250g', currentStock: 2, minStock: 10, status: 'critical' as const },
  { id: '2', name: 'Colágeno Hidrolizado 300g', currentStock: 3, minStock: 15, status: 'critical' as const },
  { id: '3', name: 'Creatina Monohidrato 300g', currentStock: 8, minStock: 10, status: 'low' as const },
];

const MOCK_SALES_DATA = [
  { date: 'Lun', facturacion: 45000, ventas: 38000 },
  { date: 'Mar', facturacion: 52000, ventas: 44000 },
  { date: 'Mié', facturacion: 48000, ventas: 41000 },
  { date: 'Jue', facturacion: 61000, ventas: 52000 },
  { date: 'Vie', facturacion: 58000, ventas: 49000 },
  { date: 'Sáb', facturacion: 72000, ventas: 61000 },
  { date: 'Dom', facturacion: 65000, ventas: 55000 },
];

export function DragDropDashboard() {
  const { widgets, updateWidgetPosition } = useDashboardLayout();
  const { formatDateRange } = useTimeFilter();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    const oldIndex = widgets.findIndex((w: any) => w.id === active.id);
    const newIndex = widgets.findIndex((w: any) => w.id === over.id);
    
    if (oldIndex !== -1 && newIndex !== -1) {
      updateWidgetPosition(active.id as string, newIndex);
    }
    
    setActiveId(null);
  };

  const getExportData = (widgetId: string): ExportData | undefined => {
    switch (widgetId) {
      case 'top-products':
        return {
          title: 'Top 5 Productos Más Vendidos',
          headers: ['Producto', 'Unidades', 'Ingresos', 'Tendencia'],
          data: MOCK_TOP_PRODUCTS.map(product => [
            product.name,
            product.quantity.toString(),
            `$${product.revenue.toLocaleString()}`,
            product.trend === 'up' ? '↑' : product.trend === 'down' ? '↓' : '→'
          ]),
          metadata: {
            period: formatDateRange,
            date: new Date().toLocaleDateString('es-ES'),
            total: `$${MOCK_TOP_PRODUCTS.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}`
          }
        };
      
      case 'stock-alert':
        return {
          title: 'Alertas de Stock',
          headers: ['Producto', 'Stock Actual', 'Stock Mínimo', 'Estado'],
          data: MOCK_STOCK_ALERTS.map(alert => [
            alert.name,
            alert.currentStock.toString(),
            alert.minStock.toString(),
            alert.status === 'critical' ? 'Crítico' : 'Bajo'
          ]),
          metadata: {
            period: formatDateRange,
            date: new Date().toLocaleDateString('es-ES'),
            total: `${MOCK_STOCK_ALERTS.length} productos`
          }
        };
      
      case 'sales-chart':
        return {
          title: 'Análisis de Ventas',
          headers: ['Día', 'Facturación', 'Ventas'],
          data: MOCK_SALES_DATA.map(sale => [
            sale.date,
            `$${sale.facturacion.toLocaleString()}`,
            `$${sale.ventas.toLocaleString()}`
          ]),
          metadata: {
            period: formatDateRange,
            date: new Date().toLocaleDateString('es-ES'),
            total: `$${MOCK_SALES_DATA.reduce((sum, s) => sum + s.facturacion, 0).toLocaleString()}`
          }
        };
      
      default:
        return undefined;
    }
  };

  const renderWidget = (widgetId: string) => {
    const widget = widgets.find((w: any) => w.id === widgetId);
    if (!widget) return null;

    const isCollapsed = widget.isCollapsed;
    const exportData = getExportData(widgetId);

    switch (widgetId) {
      case 'top-products':
        return (
          <SortableWidget key={widgetId} id={widgetId} isCollapsed={isCollapsed} exportData={exportData}>
            <TopProductsWidget products={MOCK_TOP_PRODUCTS} />
          </SortableWidget>
        );
      
      case 'stock-alert':
        return (
          <SortableWidget key={widgetId} id={widgetId} isCollapsed={isCollapsed} exportData={exportData}>
            <StockAlertWidget alerts={MOCK_STOCK_ALERTS} />
          </SortableWidget>
        );
      
      case 'sales-chart':
        return (
          <SortableWidget key={widgetId} id={widgetId} isCollapsed={isCollapsed} exportData={exportData}>
            <SalesChart data={MOCK_SALES_DATA} period="Semanal" />
          </SortableWidget>
        );
      
      default:
        return null;
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <SortableContext items={widgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
          {widgets.map(widget => renderWidget(widget.id))}
        </SortableContext>
      </div>
      
      <DragOverlay>
        {activeId ? (
          <div className="opacity-90">
            {renderWidget(activeId)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
