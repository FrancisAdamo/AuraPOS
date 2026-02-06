import { AlertTriangle, Package } from 'lucide-react';
import { AnalyticsWidget } from './AnalyticsWidget';

interface StockAlert {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
  status: 'critical' | 'low' | 'normal';
}

interface StockAlertWidgetProps {
  alerts: StockAlert[];
}

export function StockAlertWidget({ alerts }: StockAlertWidgetProps) {
  const criticalAlerts = alerts.filter(alert => alert.status === 'critical');
  const lowAlerts = alerts.filter(alert => alert.status === 'low');

  return (
    <AnalyticsWidget 
      title="Alertas de Stock"
      isCollapsible
    >
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <Package className="mx-auto text-green-500 mb-2" size={48} />
            <p className="text-notion-secondary">
              No hay alertas de stock
            </p>
          </div>
        ) : (
          <>
            {/* Alertas críticas */}
            {criticalAlerts.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-red-600 mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  Crítico ({criticalAlerts.length})
                </h4>
                <div className="space-y-2">
                  {criticalAlerts.map(alert => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div>
                        <p className="font-medium text-red-800 text-sm m-0">
                          {alert.name}
                        </p>
                        <p className="text-red-600 text-xs m-0">
                          Stock: {alert.currentStock} (Mín: {alert.minStock})
                        </p>
                      </div>
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alertas bajas */}
            {lowAlerts.length > 0 && (
              <div>
                <h4 className="font-medium text-yellow-600 mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  Bajo ({lowAlerts.length})
                </h4>
                <div className="space-y-2">
                  {lowAlerts.map(alert => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div>
                        <p className="font-medium text-yellow-800 text-sm m-0">
                          {alert.name}
                        </p>
                        <p className="text-yellow-600 text-xs m-0">
                          Stock: {alert.currentStock} (Mín: {alert.minStock})
                        </p>
                      </div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AnalyticsWidget>
  );
}
