import { PRODUCT_CATALOG, getStockStatus } from '../data/products';
import { useSearch } from '../hooks';
import { Card, Button, Input } from './ui';
import type { StockStatus } from '../types/products';

export default function InventoryManagement() {
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(PRODUCT_CATALOG, ['name', 'sku', 'provider']);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', sku: '', provider: '', stock: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddProduct = () => {
    if (formData.name.trim() && formData.sku.trim() && formData.provider.trim() && formData.stock.trim()) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setShowAddForm(false);
      setFormData({ name: '', sku: '', provider: '', stock: '' });
    }
  };

  const getStatusColor = (status: StockStatus) => {
    switch (status) {
      case 'red': return '#dc2626';
      case 'yellow': return '#f59e0b';
      case 'green': return '#16a34a';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
          }}>Gestiona tu catálogo de productos</p>
        </div>
        
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          + Nuevo Producto
        </Button>
      </div>

      {/* Formulario de agregar producto */}
      {showAddForm && (
        <Card variant="elevated" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Agregar Nuevo Producto
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nombre:</label>
              <Input
                placeholder="Ej: iPhone 16"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>SKU:</label>
              <Input
                placeholder="Ej: SKU001"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Proveedor:</label>
              <Input
                placeholder="Ej: Apple"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Stock inicial:</label>
              <Input
                type="number"
                placeholder="Ej: 50"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button onClick={() => setShowAddForm(false)} variant="secondary">
              Cancelar
            </Button>
            <Button onClick={handleAddProduct} variant="primary">
              Agregar Producto
            </Button>
          </div>
        </Card>
      )}

      {/* Búsqueda y lista de productos */}
      <div>
        <Input
          placeholder="Buscar por nombre, SKU o proveedor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="search"
        />
        
        <div style={{ marginTop: '1rem' }}>
          {filteredItems.map(item => (
            <Card key={item.id} style={{ marginBottom: '1rem' }}>
              <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>
                      {item.name}
                    </h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>
                      SKU: {item.sku} | Proveedor: {item.provider}
                    </p>
                  </div>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(item.status)
                  }} />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '500' }}>Stock:</span>
                  <span style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600',
                    color: getStatusColor(item.status)
                  }}>
                    {item.stock}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Mensaje de éxito */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          background: '#16a34a',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          zIndex: 50
        }}>
          ✓ Producto agregado exitosamente
        </div>
      )}
    </div>
  );
}
