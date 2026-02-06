import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { AnalyticsWidget } from './AnalyticsWidget';

interface SalesData {
  date: string;
  facturacion: number;
  ventas: number;
}

interface SalesChartProps {
  data: SalesData[];
  period: string;
  comparisonData?: SalesData[];
}

export function SalesChart({ data, period, comparisonData }: SalesChartProps) {
  return (
    <AnalyticsWidget 
      title={`Análisis de Ventas - ${period}`}
      isCollapsible
    >
      <div className="space-y-6">
        {/* Gráfico de líneas - Facturación vs Ventas */}
        <div>
          <h4 className="font-medium text-notion-primary mb-4">
            Facturación vs Ventas
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#37352f',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#ffffff',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="facturacion"
                stroke="#2563eb"
                strokeWidth={2}
                name="Facturación"
                dot={{ fill: '#2563eb', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="ventas"
                stroke="#16a34a"
                strokeWidth={2}
                name="Ventas"
                dot={{ fill: '#16a34a', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de barras - Picos de venta */}
        <div>
          <h4 className="font-medium text-notion-primary mb-4">
            Picos de Venta por Hora
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#37352f',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#ffffff',
                }}
              />
              <Bar
                dataKey="ventas"
                fill="#a855f7"
                name="Ventas"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Comparativa interanual si hay datos */}
        {comparisonData && comparisonData.length > 0 && (
          <div>
            <h4 className="font-medium text-notion-primary mb-4">
              Comparativa Interanual
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-notion-secondary mb-1">Año Actual</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${data.reduce((sum, d) => sum + d.facturacion, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-notion-secondary mb-1">Año Anterior</p>
                <p className="text-2xl font-bold text-gray-600">
                  ${comparisonData.reduce((sum, d) => sum + d.facturacion, 0).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="mt-2 p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">
                Crecimiento: +{(
                  ((data.reduce((sum, d) => sum + d.facturacion, 0) - 
                   comparisonData.reduce((sum, d) => sum + d.facturacion, 0)) /
                   comparisonData.reduce((sum, d) => sum + d.facturacion, 0) * 100
                ).toFixed(1))}%
              </p>
            </div>
          </div>
        )}
      </div>
    </AnalyticsWidget>
  );
}
