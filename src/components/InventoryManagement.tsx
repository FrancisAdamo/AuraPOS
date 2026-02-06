import { useState, useEffect } from 'react';
import { PRODUCT_CATALOG } from '../data/products';
import { useStore } from '../hooks/useStore';
import { useInventorySearch } from '../hooks/useInventorySearch';
import { Card, Button, Input } from './ui';
import { InventoryCommandPalette } from './inventory/InventoryCommandPalette';
import { InventoryFilters } from './inventory/InventoryFilters';
import type { StockStatus } from '../types/products';
import type { ProductFormData, InventoryFilter } from '../types/inventory';

export default function InventoryManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<InventoryFilter>({});
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    sku: '',
    provider: '',
    stock: '',
    barcode: '',
    size: '',
    flavor: '',
    brand: '',
    line: '',
    format: '',
    weight: '',
    commercialName: '',
    organic: false,
    glutenFree: false,
    vegan: false,
  });

  // Convertir PRODUCT_CATALOG a ProductFormData
  const inventoryProducts: ProductFormData[] = PRODUCT_CATALOG.map(item => ({
    name: item.name,
    sku: item.sku,
    provider: item.provider,
    stock: item.currentStock.toString(),
    barcode: '', // Agregar cuando se tenga el dato
    size: '',
    flavor: '',
    brand: item.provider,
    line: '',
    format: '',
    weight: '',
    commercialName: item.name,
    organic: false,
    glutenFree: false,
    vegan: false,
  }));

  const { filteredProducts, stats } = useInventorySearch(inventoryProducts, searchTerm, filters);
  const { currentStore, stores, setStore } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddProduct = () => {
    if (formData.name.trim() && formData.sku.trim() && formData.provider.trim() && formData.stock.trim()) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setShowAddForm(false);
      setFormData({
        name: '',
        sku: '',
        provider: '',
        stock: '',
        barcode: '',
        size: '',
        flavor: '',
        brand: '',
        line: '',
        format: '',
        weight: '',
        commercialName: '',
        organic: false,
        glutenFree: false,
        vegan: false,
      });
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
    <div className="flex flex-col gap-6">
      {/* Header con selector de sucursal */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-notion-primary m-0">
            Módulo de inventario
          </h1>
          <p className="text-notion-secondary mt-1">
            Gestiona tu catálogo de productos
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Selector de sucursal */}
          <select
            value={currentStore?.id || ''}
            onChange={(e) => setStore(e.target.value)}
            className="px-4 py-2 border border-notion-border rounded-lg bg-notion-background"
          >
            {stores.map(store => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
          
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            + Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Formulario de agregar producto */}
      {showAddForm && (
        <Card variant="elevated">
          <h2 className="text-xl font-semibold mb-4">
            Agregar Nuevo Producto
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre:</label>
              <Input
                placeholder="Ej: Proteína Whey"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">SKU:</label>
              <Input
                placeholder="Ej: SKU001"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Código de Barras:</label>
              <Input
                placeholder="Ej: 1234567890123"
                value={formData.barcode}
                onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Proveedor:</label>
              <Input
                placeholder="Ej: NutriScience"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Stock inicial:</label>
              <Input
                type="number"
                placeholder="Ej: 50"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tamaño:</label>
              <Input
                placeholder="Ej: 1kg"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sabor:</label>
              <Input
                placeholder="Ej: Vainilla"
                value={formData.flavor}
                onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Marca:</label>
              <Input
                placeholder="Ej: Optimum Nutrition"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Línea:</label>
              <Input
                placeholder="Ej: Gold Standard"
                value={formData.line}
                onChange={(e) => setFormData({ ...formData, line: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Formato:</label>
              <select
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                className="px-3 py-2 border border-notion-border rounded bg-notion-background w-full"
              >
                <option value="">Seleccionar...</option>
                <option value="Polvo">Polvo</option>
                <option value="Líquido">Líquido</option>
                <option value="Cápsulas">Cápsulas</option>
                <option value="Tabletas">Tabletas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Peso:</label>
              <Input
                placeholder="Ej: 1000g"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nombre Comercial:</label>
              <Input
                placeholder="Ej: Gold Standard 100% Whey"
                value={formData.commercialName}
                onChange={(e) => setFormData({ ...formData, commercialName: e.target.value })}
              />
            </div>
          </div>

          {/* Flags booleanos */}
          <div className="flex gap-6 mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.organic}
                onChange={(e) => setFormData({ ...formData, organic: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Orgánico</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.glutenFree}
                onChange={(e) => setFormData({ ...formData, glutenFree: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Sin TACC</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.vegan}
                onChange={(e) => setFormData({ ...formData, vegan: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Vegano</span>
            </label>
          </div>
          
          <div className="flex gap-2 mt-6">
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
        
        <div className="mt-4">
          {filteredItems.map(item => (
            <Card key={item.id} className="mb-4">
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold m-0 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-notion-secondary text-sm m-0">
                      SKU: {item.sku} | Proveedor: {item.provider}
                    </p>
                  </div>
                  <div className="w-3 h-3 rounded-full" 
                       style={{ backgroundColor: getStatusColor(item.status) }} />
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">Stock:</span>
                  <span className="text-lg font-semibold" 
                        style={{ color: getStatusColor(item.status) }}>
                    {item.currentStock}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="fixed top-8 right-8 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          ✓ Producto agregado exitosamente
        </div>
      )}
    </div>
  );
}
