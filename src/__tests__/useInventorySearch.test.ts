import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInventorySearch } from '../hooks/useInventorySearch';
import type { ProductFormData, InventoryFilter } from '../types/inventory';

// Mock data para testing
const mockProducts: ProductFormData[] = [
  {
    name: 'Proteína Whey Vainilla',
    sku: 'PROTEIN-WHEY-VAN-1KG',
    provider: 'NutriFit Pro',
    stock: '50',
    barcode: '1234567890123',
    size: '1kg',
    flavor: 'Vainilla',
    brand: 'NutriFit Pro',
    line: 'Premium',
    format: 'Polvo',
    weight: '1000g',
    commercialName: 'Ultra Whey Protein',
    organic: false,
    glutenFree: true,
    vegan: false,
  },
  {
    name: 'Proteína Whey Chocolate',
    sku: 'PROTEIN-WHEY-CHOC-1KG',
    provider: 'NutriFit Pro',
    stock: '30',
    barcode: '1234567890124',
    size: '1kg',
    flavor: 'Chocolate',
    brand: 'NutriFit Pro',
    line: 'Premium',
    format: 'Polvo',
    weight: '1000g',
    commercialName: 'Ultra Whey Protein',
    organic: true,
    glutenFree: true,
    vegan: true,
  },
  {
    name: 'Creatina Monohidrato',
    sku: 'CREATINE-MONO-300G',
    provider: 'MuscleTech',
    stock: '100',
    barcode: '1234567890125',
    size: '300g',
    flavor: 'Sin sabor',
    brand: 'MuscleTech',
    line: 'Basic',
    format: 'Polvo',
    weight: '300g',
    commercialName: 'Pure Creatine',
    organic: false,
    glutenFree: false,
    vegan: false,
  },
];

describe('useInventorySearch', () => {
  it('debería devolver todos los productos sin filtros ni búsqueda', () => {
    const { result } = renderHook(() => 
      useInventorySearch(mockProducts, '', {})
    );

    expect(result.current.filteredProducts).toHaveLength(3);
    expect(result.current.stats.filteredCount).toBe(3);
    expect(result.current.stats.hasActiveFilters).toBe(false);
    expect(result.current.stats.hasSearchTerm).toBe(false);
  });

  it('debería filtrar por término de búsqueda', () => {
    const { result } = renderHook(() => 
      useInventorySearch(mockProducts, 'vainilla', {})
    );

    expect(result.current.filteredProducts).toHaveLength(1);
    expect(result.current.filteredProducts[0].name).toBe('Proteína Whey Vainilla');
    expect(result.current.stats.hasSearchTerm).toBe(true);
  });

  it('debería filtrar por marca', () => {
    const filters: InventoryFilter = { brand: 'NutriFit Pro' };
    const { result } = renderHook(() => 
      useInventorySearch(mockProducts, '', filters)
    );

    expect(result.current.filteredProducts).toHaveLength(2);
    expect(result.current.filteredProducts.every(p => p.brand === 'NutriFit Pro')).toBe(true);
    expect(result.current.stats.hasActiveFilters).toBe(true);
  });

  it('debería filtrar por formato', () => {
    const filters: InventoryFilter = { format: 'Polvo' };
    const { result } = renderHook(() => 
      useInventorySearch(mockProducts, '', filters)
    );

    expect(result.current.filteredProducts).toHaveLength(3);
    expect(result.current.filteredProducts.every(p => p.format === 'Polvo')).toBe(true);
  });

  it('debería filtrar por atributos especiales', () => {
    const filters: InventoryFilter = { organic: true };
    const { result } = renderHook(() => 
      useInventorySearch(mockProducts, '', filters)
    );

    expect(result.current.filteredProducts).toHaveLength(1);
    expect(result.current.filteredProducts[0].organic).toBe(true);
  });

  it('debería filtrar por rango de stock', () => {
    const filters: InventoryFilter = { minStock: 40, maxStock: 60 };
    const { result } = renderHook(() => 
      useInventorySearch(mockProducts, '', filters)
    );

    expect(result.current.filteredProducts).toHaveLength(1);
    expect(result.current.filteredProducts[0].stock).toBe('50');
  });

  it('debería combinar múltiples filtros', () => {
    const filters: InventoryFilter = { 
      brand: 'NutriFit Pro',
      organic: false,
      glutenFree: true
    };
    const { result } = renderHook(() => 
      useInventorySearch(mockProducts, '', filters)
    );

    expect(result.current.filteredProducts).toHaveLength(1);
    expect(result.current.filteredProducts[0].name).toBe('Proteína Whey Vainilla');
  });

  it('debería calcular relevancia correctamente', () => {
    const { result } = renderHook(() => 
      useInventorySearch(mockProducts, 'PROTEIN-WHEY-VAN', {})
    );

    const searchResults = result.current.searchResults;
    expect(searchResults[0].relevance).toBeGreaterThan(searchResults[1].relevance);
    expect(searchResults[0].matchedFields).toContain('SKU');
    expect(searchResults[0].matchedFields).toContain('Nombre');
  });

  it('debería dar bonus por coincidencia exacta', () => {
    const { result } = renderHook(() => 
      useInventorySearch(mockProducts, 'PROTEIN-WHEY-VAN-1KG', {})
    );

    const searchResults = result.current.searchResults;
    const exactMatch = searchResults.find(r => r.product.sku === 'PROTEIN-WHEY-VAN-1KG');
    expect(exactMatch?.relevance).toBeGreaterThan(15); // 8 (SKU) + 15 (bonus exacto)
  });

  it('debería calcular estadísticas correctamente', () => {
    const filters: InventoryFilter = { brand: 'NutriFit Pro' };
    const { result } = renderHook(() => 
      useInventorySearch(mockProducts, 'test', filters)
    );

    expect(result.current.stats.totalProducts).toBe(3);
    expect(result.current.stats.filteredCount).toBe(0); // No hay productos NutriFit Pro con "test"
    expect(result.current.stats.filterCount).toBe(1);
    expect(result.current.stats.hasActiveFilters).toBe(true);
    expect(result.current.stats.hasSearchTerm).toBe(true);
    expect(result.current.stats.percentage).toBe(0);
  });

  it('debería manejar búsqueda insensible a mayúsculas/minúsculas', () => {
    const { result } = renderHook(() => 
      useInventorySearch(mockProducts, 'PROTEÍNA', {})
    );

    expect(result.current.filteredProducts).toHaveLength(2);
    expect(result.current.filteredProducts.every(p => 
      p.name.toLowerCase().includes('proteína')
    )).toBe(true);
  });

  it('debería ordenar resultados por relevancia descendente', () => {
    const { result } = renderHook(() => 
      useInventorySearch(mockProducts, 'proteína', {})
    );

    const searchResults = result.current.searchResults;
    for (let i = 0; i < searchResults.length - 1; i++) {
      expect(searchResults[i].relevance).toBeGreaterThanOrEqual(searchResults[i + 1].relevance);
    }
  });
});
