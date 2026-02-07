import { Filter, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { InventoryFilter } from '../../types/inventory';

interface InventoryFiltersProps {
  filters: InventoryFilter;
  onFiltersChange: (filters: InventoryFilter) => void;
  brands: string[];
  flavors: string[];
  formats: string[];
}

const BRAND_OPTIONS = ['MuscleFit', 'Nutri Premium', 'FitNutrition', 'HealthLife', 'ProteinPlus'];
const FLAVOR_OPTIONS = ['Vainilla', 'Chocolate', 'Fresa', 'Limón', 'Mango', 'Caramelo'];
const FORMAT_OPTIONS = ['Polvo', 'Líquido', 'Cápsulas', 'Tabletas', 'Barritas'];

export function InventoryFilters({ 
  filters, 
  onFiltersChange, 
  brands, 
  flavors, 
  formats 
}: InventoryFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const brandOptions = brands.length ? brands : BRAND_OPTIONS;
  const flavorOptions = flavors.length ? flavors : FLAVOR_OPTIONS;
  const formatOptions = formats.length ? formats : FORMAT_OPTIONS;

  const handleFilterChange = (key: keyof InventoryFilter, value: unknown) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && value !== false
  );

  return (
    <div className="bg-white border border-notion-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-notion-secondary" />
          <span className="font-medium text-notion-primary">Filtros Avanzados</span>
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
              Activos
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
            >
              <X className="h-3 w-3" />
              Limpiar
            </button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-notion-secondary hover:text-notion-primary"
          >
            {isExpanded ? 'Ocultar' : 'Mostrar'}
            <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Marca */}
          <div>
            <label
              htmlFor="inventory-filter-brand"
              className="block text-sm font-medium text-notion-primary mb-2"
            >
              Marca
            </label>
            <select
              id="inventory-filter-brand"
              value={filters.brand || ''}
              onChange={(e) => handleFilterChange('brand', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-notion-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las marcas</option>
              {brandOptions.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Sabor */}
          <div>
            <label
              htmlFor="inventory-filter-flavor"
              className="block text-sm font-medium text-notion-primary mb-2"
            >
              Sabor
            </label>
            <select
              id="inventory-filter-flavor"
              value={filters.flavor || ''}
              onChange={(e) => handleFilterChange('flavor', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-notion-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los sabores</option>
              {flavorOptions.map(flavor => (
                <option key={flavor} value={flavor}>{flavor}</option>
              ))}
            </select>
          </div>

          {/* Formato */}
          <div>
            <label
              htmlFor="inventory-filter-format"
              className="block text-sm font-medium text-notion-primary mb-2"
            >
              Formato
            </label>
            <select
              id="inventory-filter-format"
              value={filters.format || ''}
              onChange={(e) => handleFilterChange('format', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-notion-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los formatos</option>
              {formatOptions.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>

          {/* Rango de Stock */}
          <div>
            <label
              htmlFor="inventory-filter-min-stock"
              className="block text-sm font-medium text-notion-primary mb-2"
            >
              Stock Mínimo
            </label>
            <input
              id="inventory-filter-min-stock"
              type="number"
              value={filters.minStock || ''}
              onChange={(e) => handleFilterChange('minStock', e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="0"
              className="w-full px-3 py-2 border border-notion-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="inventory-filter-max-stock"
              className="block text-sm font-medium text-notion-primary mb-2"
            >
              Stock Máximo
            </label>
            <input
              id="inventory-filter-max-stock"
              type="number"
              value={filters.maxStock || ''}
              onChange={(e) => handleFilterChange('maxStock', e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="999"
              className="w-full px-3 py-2 border border-notion-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Flags */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-notion-primary mb-2">
              Atributos Especiales
            </label>
            
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.organic || false}
                onChange={(e) => handleFilterChange('organic', e.target.checked || undefined)}
                className="rounded border-notion-border"
              />
              Orgánico
            </label>
            
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.glutenFree || false}
                onChange={(e) => handleFilterChange('glutenFree', e.target.checked || undefined)}
                className="rounded border-notion-border"
              />
              Sin TACC
            </label>
            
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.vegan || false}
                onChange={(e) => handleFilterChange('vegan', e.target.checked || undefined)}
                className="rounded border-notion-border"
              />
              Vegano
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
