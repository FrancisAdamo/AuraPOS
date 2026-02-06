import { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { TopProductsWidget, StockAlertWidget, SalesChart } from './dashboard';
import { Card, Button } from './ui';

// Mock data para demostración
const mockTopProducts = [
  { id: '1', name: 'Proteína Whey Vainilla', quantity: 45, revenue: 2069.55, trend: 'up' as const },
  { id: '2', name: 'Proteína Whey Chocolate', quantity: 38, revenue: 1747.62, trend: 'up' as const },
  { id: '3', name: 'Creatina Monohidrato', quantity: 28, revenue: 798.00, trend: 'stable' as const },
  { id: '4', name: 'BCAA Limón', quantity: 22, revenue: 791.78, trend: 'down' as const },
  { id: '5', name: 'Multivitamínico Diario', quantity: 19, revenue: 436.81, trend: 'up' as const },
];

const mockStockAlerts = [
  { id: '1', name: 'Proteína Whey Vainilla', currentStock: 3, minStock: 10, status: 'critical' as const },
  { id: '2', name: 'BCAA Limón', currentStock: 8, minStock: 10, status: 'low' as const },
  { id: '3', name: 'Multivitamínico Diario', currentStock: 4, minStock: 5, status: 'low' as const },
];

const mockSalesData = [
  { date: '00:00', facturacion: 450, ventas: 12 },
  { date: '04:00', facturacion: 280, ventas: 8 },
  { date: '08:00', facturacion: 1200, ventas: 35 },
  { date: '12:00', facturacion: 890, ventas: 24 },
  { date: '16:00', facturacion: 650, ventas: 18 },
  { date: '20:00', facturacion: 420, ventas: 11 },
];

const mockComparisonData = [
  { date: '00:00', facturacion: 380, ventas: 10 },
  { date: '04:00', facturacion: 220, ventas: 6 },
  { date: '08:00', facturacion: 980, ventas: 28 },
  { date: '12:00', facturacion: 720, ventas: 19 },
  { date: '16:00', facturacion: 540, ventas: 15 },
  { date: '20:00', facturacion: 350, ventas: 9 },
];

export default function DashboardPanel() {
  const [timeFilter, setTimeFilter] = useState<'day' | 'month' | 'year'>('day');

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-notion-primary m-0">
            Dashboard
          </h1>
          <p className="text-notion-secondary mt-1">
            Análisis y métricas del negocio
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Filtros temporales */}
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-notion-secondary" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as 'day' | 'month' | 'year')}
              className="px-3 py-2 border border-notion-border rounded-lg bg-notion-background"
            >
              <option value="day">Día</option>
              <option value="month">Mes</option>
              <option value="year">Año</option>
            </select>
          </div>
          
          <Button variant="ghost" size="sm">
            <Filter size={16} />
            Más filtros
          </Button>
        </div>
      </div>

      {/* Grid de widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="lg:col-span-1">
          <TopProductsWidget 
            products={mockTopProducts}
            period={timeFilter === 'day' ? 'Hoy' : timeFilter === 'month' ? 'Este Mes' : 'Este Año'}
          />
        </div>

        {/* Stock Alerts */}
        <div className="lg:col-span-1">
          <StockAlertWidget alerts={mockStockAlerts} />
        </div>

        {/* Sales Chart - ocupa más espacio */}
        <div className="lg:col-span-2 xl:col-span-1">
          <SalesChart 
            data={mockSalesData}
            period={timeFilter === 'day' ? 'Hoy' : timeFilter === 'month' ? 'Este Mes' : 'Este Año'}
            comparisonData={timeFilter === 'year' ? mockComparisonData : undefined}
          />
        </div>
      </div>

      {/* Resumen rápido */}
      <Card className="mt-6">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-notion-primary mb-4">
            Resumen del {timeFilter === 'day' ? 'Día' : timeFilter === 'month' ? 'Mes' : 'Año'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-notion-secondary mb-1">Ventas Totales</p>
              <p className="text-2xl font-bold text-blue-600">127</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-notion-secondary mb-1">Facturación</p>
              <p className="text-2xl font-bold text-green-600">$4,890</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-notion-secondary mb-1">Ticket Promedio</p>
              <p className="text-2xl font-bold text-purple-600">$38.50</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-notion-secondary mb-1">Productos Vendidos</p>
              <p className="text-2xl font-bold text-yellow-600">89</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
