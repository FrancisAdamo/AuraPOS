import { TrendingUp, AlertTriangle, Wallet } from 'lucide-react';
import { useState } from 'react';

export default function AlertDashboard() {
  const [topProducts] = useState([
    { id: 1, name: 'Proteína Whey Vainilla', sales: 156, revenue: 7161.44 },
    { id: 2, name: 'Omega 3 Premium', sales: 142, revenue: 4680.58 },
    { id: 3, name: 'Colágeno Hidrolizado', sales: 87, revenue: 3349.50 },
  ]);

  const [lowStockItems] = useState([
    { id: 1, name: 'BCAA Limón 250g', sku: 'BCAA001', stock: 2 },
    { id: 2, name: 'Colágeno Hidrolizado 300g', sku: 'COLAG015', stock: 3 },
    { id: 3, name: 'Creatina Monohidrato 300g', sku: 'CREA008', stock: 8 },
  ]);

  const [cashSummary] = useState({
    cash: 12500,
    card: 18750,
    transfer: 5200,
    total: 36450,
  });

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: '0.25rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    padding: '1.5rem',
  };

  const widgetHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  };

  const iconBoxStyle = (bgColor: string) => ({
    padding: '0.5rem',
    backgroundColor: bgColor,
    borderRadius: '0.125rem',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          color: '#37352f',
          margin: 0,
        }}>Dashboard</h1>
        <p style={{
          color: '#9ca3af',
          marginTop: '0.25rem',
          margin: 0,
        }}>Resumen de actividad del día</p>
      </div>

      {/* Widgets Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
      }}>
        
        {/* Widget 1: Top Products */}
        <div style={cardStyle}>
          <div style={widgetHeaderStyle}>
            <div style={iconBoxStyle('#eff6ff')}>
              <TrendingUp size={20} color="#2563eb" />
            </div>
            <h2 style={{
              fontWeight: 600,
              color: '#37352f',
              margin: 0,
              fontSize: '1rem',
            }}>Productos Más Vendidos</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {topProducts.map((product, idx) => (
              <div key={product.id} style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                paddingBottom: '0.75rem',
                borderBottom: idx === topProducts.length - 1 ? 'none' : '1px solid #e5e5e5',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      color: '#9ca3af',
                      backgroundColor: '#f3f4f6',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                    }}>
                      {idx + 1}
                    </span>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#37352f',
                      margin: 0,
                    }}>{product.name}</p>
                  </div>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                    marginTop: '0.25rem',
                    margin: 0,
                  }}>{product.sales} unidades</p>
                </div>
                <p style={{
                  fontWeight: 600,
                  color: '#2563eb',
                  fontSize: '0.875rem',
                  margin: 0,
                }}>
                  ${product.revenue.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Low Stock Alert */}
        <div style={cardStyle}>
          <div style={widgetHeaderStyle}>
            <div style={iconBoxStyle('#fef2f2')}>
              <AlertTriangle size={20} color="#dc2626" />
            </div>
            <h2 style={{
              fontWeight: 600,
              color: '#37352f',
              margin: 0,
              fontSize: '1rem',
            }}>Alerta de stock</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {lowStockItems.map((item, idx) => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.75rem',
                borderBottom: idx === lowStockItems.length - 1 ? 'none' : '1px solid #e5e5e5',
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#37352f',
                    margin: 0,
                  }}>{item.name}</p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                    margin: 0,
                  }}>{item.sku}</p>
                </div>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#fee2e2',
                  color: '#b91c1c',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  borderRadius: '0.25rem',
                }}>
                  {item.stock} unid.
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 3: Cash Summary */}
        <div style={cardStyle}>
          <div style={widgetHeaderStyle}>
            <div style={iconBoxStyle('#f0fdf4')}>
              <Wallet size={20} color="#16a34a" />
            </div>
            <h2 style={{
              fontWeight: 600,
              color: '#37352f',
              margin: 0,
              fontSize: '1rem',
            }}>Resumen de caja</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #e5e5e5' }}>
              <p style={{
                fontSize: '0.75rem',
                color: '#9ca3af',
                marginBottom: '0.25rem',
                margin: 0,
              }}>Efectivo</p>
              <p style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: '#37352f',
                margin: 0,
              }}>${cashSummary.cash.toLocaleString()}</p>
            </div>
            
            <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #e5e5e5' }}>
              <p style={{
                fontSize: '0.75rem',
                color: '#9ca3af',
                marginBottom: '0.25rem',
                margin: 0,
              }}>Tarjeta</p>
              <p style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: '#37352f',
                margin: 0,
              }}>${cashSummary.card.toLocaleString()}</p>
            </div>
            
            <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #e5e5e5' }}>
              <p style={{
                fontSize: '0.75rem',
                color: '#9ca3af',
                marginBottom: '0.25rem',
                margin: 0,
              }}>Transferencia</p>
              <p style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: '#37352f',
                margin: 0,
              }}>${cashSummary.transfer.toLocaleString()}</p>
            </div>
            
            <div style={{ paddingTop: '0.5rem' }}>
              <p style={{
                fontSize: '0.75rem',
                color: '#9ca3af',
                marginBottom: '0.25rem',
                margin: 0,
              }}>Total del Día</p>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#16a34a',
                margin: 0,
              }}>${cashSummary.total.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
