import { ChevronDown, Filter, Search, X, Plus } from 'lucide-react';
import { useState, useMemo } from 'react';

interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  provider: string;
  stock: number;
  status: 'green' | 'yellow' | 'red';
}

export default function InventoryModule() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, sku: 'SKU001', name: 'Proteína Whey Vainilla 1kg', provider: 'MuscleFit', stock: 45, status: 'green' },
    { id: 2, sku: 'SKU002', name: 'Proteína Whey Chocolate 1kg', provider: 'MuscleFit', stock: 32, status: 'green' },
    { id: 3, sku: 'SKU003', name: 'Creatina Monohidrato 300g', provider: 'Nutri Premium', stock: 8, status: 'yellow' },
    { id: 4, sku: 'SKU004', name: 'BCAA Limón 250g', provider: 'FitNutrition', stock: 2, status: 'red' },
    { id: 5, sku: 'SKU005', name: 'Multivitamínico 60 cápsulas', provider: 'Nutri Premium', stock: 18, status: 'green' },
    { id: 6, sku: 'SKU006', name: 'Omega 3 Premium 120 cápsulas', provider: 'HealthLife', stock: 12, status: 'green' },
    { id: 7, sku: 'SKU007', name: 'Colágeno Hidrolizado 300g', provider: 'HealthLife', stock: 3, status: 'red' },
    { id: 8, sku: 'SKU008', name: 'Barrita Proteica Almendra pack x12', provider: 'FitNutrition', stock: 28, status: 'green' },
  ]);
  
  const [formData, setFormData] = useState({ name: '', sku: '', provider: '', stock: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const providers = Array.from(new Set(inventory.map(item => item.provider))).sort();
  
  const getStatusByStock = (stock: number): 'green' | 'yellow' | 'red' => {
    if (stock <= 0) return 'red';
    if (stock <= 5) return 'red';
    if (stock <= 15) return 'yellow';
    return 'green';
  };

  const handleAddProduct = () => {
    if (!formData.name.trim() || !formData.sku.trim() || !formData.provider.trim() || !formData.stock.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    const stockNum = parseInt(formData.stock);
    if (isNaN(stockNum) || stockNum < 0) {
      alert('El stock debe ser un número válido');
      return;
    }

    const newProduct: InventoryItem = {
      id: inventory.length + 1,
      name: formData.name.trim(),
      sku: formData.sku.trim().toUpperCase(),
      provider: formData.provider.trim(),
      stock: stockNum,
      status: getStatusByStock(stockNum),
    };

    setInventory([...inventory, newProduct]);
    setFormData({ name: '', sku: '', provider: '', stock: '' });
    setShowAddForm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  // Filtrar por búsqueda (nombre, SKU, proveedor)
  const filteredInventory = useMemo(() => {
    let result = inventory;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(term) ||
        item.sku.toLowerCase().includes(term) ||
        item.provider.toLowerCase().includes(term)
      );
    }
    
    if (selectedProvider) {
      result = result.filter(item => item.provider === selectedProvider);
    }
    
    return result;
  }, [searchTerm, selectedProvider]);

  const groupedByProvider = filteredInventory.reduce((acc, item) => {
    if (!acc[item.provider]) {
      acc[item.provider] = [];
    }
    acc[item.provider].push(item);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  const toggleGroup = (provider: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green':
        return { bg: '#dcfce7', color: '#166534' };
      case 'yellow':
        return { bg: '#fef3c7', color: '#854d0e' };
      case 'red':
        return { bg: '#fee2e2', color: '#991b1b' };
      default:
        return { bg: '#f3f4f6', color: '#4b5563' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'green':
        return 'En stock';
      case 'yellow':
        return 'Stock bajo';
      case 'red':
        return 'Crítico';
      default:
        return 'Desconocido';
    }
  };

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: '0.25rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Success message */}
      {showSuccess && (
        <div style={{
          padding: '0.75rem 1rem',
          backgroundColor: '#dcfce7',
          border: '1px solid #bbf7d0',
          borderRadius: '0.25rem',
          color: '#166534',
          fontWeight: 500,
        }}>
          ✓ Producto agregado correctamente
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#37352f',
            margin: 0,
          }}>Módulo de inventario</h1>
          <p style={{
            color: '#9ca3af',
            marginTop: '0.25rem',
            margin: 0,
          }}>Gestiona productos agrupados por proveedor</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#10b981')}
        >
          <Plus size={18} />
          Agregar producto
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e5e5',
          borderRadius: '0.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <h3 style={{ margin: 0, color: '#37352f', fontWeight: 600 }}>Nuevo producto</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#37352f' }}>Nombre:</label>
              <input
                type="text"
                placeholder="Ej: iPhone 16"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #e5e5e5',
                  borderRadius: '0.25rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#37352f' }}>SKU:</label>
              <input
                type="text"
                placeholder="Ej: SKU001"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #e5e5e5',
                  borderRadius: '0.25rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#37352f' }}>Proveedor:</label>
              <input
                type="text"
                placeholder="Ej: Apple"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #e5e5e5',
                  borderRadius: '0.25rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#37352f' }}>Stock inicial:</label>
              <input
                type="number"
                placeholder="Ej: 50"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #e5e5e5',
                  borderRadius: '0.25rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.875rem',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleAddProduct}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
            >
              Guardar producto
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setFormData({ name: '', sku: '', provider: '', stock: '' });
              }}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Search Bar - Busca por nombre, SKU y proveedor */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        border: '1px solid #e5e5e5',
        borderRadius: '0.25rem',
        backgroundColor: '#ffffff',
        transition: 'all 0.2s ease',
        boxShadow: searchTerm ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
      }}>
        <Search size={20} color="#9ca3af" />
        <input
          type="text"
          placeholder="Buscar por nombre, SKU o proveedor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '1rem',
            color: '#37352f',
            backgroundColor: 'transparent',
          }}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              color: '#9ca3af',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#37352f')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filter Section - Dropdown para muchos proveedores */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af' }}>
          <Filter size={20} />
          <span style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>Filtrar por proveedor:</span>
        </div>
        
        {/* Provider buttons - Responsive */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <button
            onClick={() => setSelectedProvider(null)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              border: selectedProvider === null ? 'none' : '1px solid #e5e5e5',
              backgroundColor: selectedProvider === null ? '#3b82f6' : '#ffffff',
              color: selectedProvider === null ? '#ffffff' : '#37352f',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.875rem',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (selectedProvider !== null) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedProvider !== null) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff';
              }
            }}
          >
            Ver todos ({inventory.length})
          </button>
          
          {providers.map(provider => {
            const count = inventory.filter(item => item.provider === provider).length;
            return (
              <button
                key={provider}
                onClick={() => setSelectedProvider(provider)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: selectedProvider === provider ? 'none' : '1px solid #e5e5e5',
                  backgroundColor: selectedProvider === provider ? '#3b82f6' : '#ffffff',
                  color: selectedProvider === provider ? '#ffffff' : '#37352f',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (selectedProvider !== provider) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f5f5f5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedProvider !== provider) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff';
                  }
                }}
              >
                {provider} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filters Info */}
      {(searchTerm || selectedProvider) && (
        <div style={{
          padding: '0.75rem 1rem',
          backgroundColor: '#f0fdf4',
          border: '1px solid #dcfce7',
          borderRadius: '0.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ fontSize: '0.875rem', color: '#166534' }}>
            <span style={{ fontWeight: 600 }}>Filtros activos:</span>
            {searchTerm && <span> Búsqueda: "{searchTerm}"</span>}
            {searchTerm && selectedProvider && <span>,</span>}
            {selectedProvider && <span> Proveedor: {selectedProvider}</span>}
            <span> - {filteredInventory.length} producto{filteredInventory.length !== 1 ? 's' : ''} encontrado{filteredInventory.length !== 1 ? 's' : ''}</span>
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedProvider(null);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#166534',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              padding: '0.25rem 0.5rem',
              textDecoration: 'underline',
            }}
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Inventory Table by Provider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {Object.entries(groupedByProvider).length === 0 ? (
          <div style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            color: '#9ca3af',
            backgroundColor: '#f9fafb',
            borderRadius: '0.25rem',
            border: '1px solid #e5e5e5',
          }}>
            <Search size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>No se encontraron productos</p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
              Intenta con otros términos de búsqueda o proveedores
            </p>
          </div>
        ) : (
          Object.entries(groupedByProvider).map(([provider, items]) => (
            <div key={provider} style={cardStyle}>
              
              {/* Provider Header */}
              <button
                onClick={() => toggleGroup(provider)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #e5e5e5',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <ChevronDown
                    size={20}
                    color="#9ca3af"
                    style={{
                      transition: 'transform 0.2s ease',
                      transform: expandedGroups[provider] ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                  <h3 style={{
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    color: '#37352f',
                    margin: 0,
                  }}>{provider}</h3>
                  <span style={{
                    fontSize: '0.75rem',
                    backgroundColor: '#f3f4f6',
                    color: '#9ca3af',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    margin: 0,
                  }}>
                    {items.length} producto{items.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#9ca3af',
                }}>
                  Stock total: {items.reduce((sum, item) => sum + item.stock, 0)}
                </span>
              </button>

              {/* Items Table */}
              {expandedGroups[provider] && (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e5e5' }}>
                        <th style={{
                          padding: '0.75rem 1.5rem',
                          textAlign: 'left',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#9ca3af',
                        }}>SKU</th>
                        <th style={{
                          padding: '0.75rem 1.5rem',
                          textAlign: 'left',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#9ca3af',
                        }}>Producto</th>
                        <th style={{
                          padding: '0.75rem 1.5rem',
                          textAlign: 'left',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#9ca3af',
                        }}>Stock actual</th>
                        <th style={{
                          padding: '0.75rem 1.5rem',
                          textAlign: 'left',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#9ca3af',
                        }}>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, idx) => (
                        <tr
                          key={item.id}
                          style={{
                            borderBottom: idx === items.length - 1 ? 'none' : '1px solid #e5e5e5',
                            transition: 'background-color 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <td style={{
                            padding: '1rem 1.5rem',
                            fontSize: '0.875rem',
                            fontFamily: 'monospace',
                            color: '#9ca3af',
                          }}>{item.sku}</td>
                          <td style={{
                            padding: '1rem 1.5rem',
                            fontWeight: 500,
                            color: '#37352f',
                          }}>{item.name}</td>
                          <td style={{
                            padding: '1rem 1.5rem',
                            fontSize: '1.125rem',
                            fontWeight: 'bold',
                            color: '#37352f',
                          }}>{item.stock}</td>
                          <td style={{
                            padding: '1rem 1.5rem',
                          }}>
                            <span style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '0.25rem',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              backgroundColor: getStatusColor(item.status).bg,
                              color: getStatusColor(item.status).color,
                            }}>
                              {getStatusLabel(item.status)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
