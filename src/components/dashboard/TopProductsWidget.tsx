import { Trophy, TrendingUp } from 'lucide-react';
import { AnalyticsWidget } from './AnalyticsWidget';

interface TopProduct {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
}

interface TopProductsWidgetProps {
  products: TopProduct[];
  period?: string;
}

export function TopProductsWidget({ products, period = 'Hoy' }: TopProductsWidgetProps) {
  return (
    <AnalyticsWidget 
      title={`Top 5 Productos - ${period}`}
      isCollapsible
    >
      <div className="space-y-3">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-notion-hover rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-notion-primary text-sm m-0">
                  {product.name}
                </p>
                <p className="text-notion-secondary text-xs m-0">
                  {product.quantity} vendidos
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="font-semibold text-notion-primary m-0">
                  ${product.revenue.toFixed(2)}
                </p>
                <div className="flex items-center gap-1 text-xs">
                  {product.trend === 'up' && (
                    <>
                      <TrendingUp size={12} className="text-green-500" />
                      <span className="text-green-500">+12%</span>
                    </>
                  )}
                  {product.trend === 'down' && (
                    <>
                      <TrendingUp size={12} className="text-red-500 rotate-180" />
                      <span className="text-red-500">-8%</span>
                    </>
                  )}
                  {product.trend === 'stable' && (
                    <span className="text-notion-secondary">0%</span>
                  )}
                </div>
              </div>
              
              {index === 0 && (
                <Trophy className="text-yellow-500" size={20} />
              )}
            </div>
          </div>
        ))}
      </div>
    </AnalyticsWidget>
  );
}
