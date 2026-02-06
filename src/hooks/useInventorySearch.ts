import { useMemo, useCallback } from 'react';
import type { ProductFormData, InventoryFilter, InventorySearchResult } from '../types/inventory';

export function useInventorySearch(
  products: ProductFormData[],
  searchTerm: string,
  filters: InventoryFilter
) {
  const applyFilters = useCallback((productsToFilter: ProductFormData[], currentFilters: InventoryFilter) => {
    let filteredProducts = [...productsToFilter];

    // Aplicar filtros
    if (currentFilters.brand) {
      filteredProducts = filteredProducts.filter(p => 
        p.brand.toLowerCase().includes(currentFilters.brand!.toLowerCase())
      );
    }

    if (currentFilters.flavor) {
      filteredProducts = filteredProducts.filter(p => 
        p.flavor.toLowerCase().includes(currentFilters.flavor!.toLowerCase())
      );
    }

    if (currentFilters.format) {
      filteredProducts = filteredProducts.filter(p => 
        p.format.toLowerCase().includes(currentFilters.format!.toLowerCase())
      );
    }

    if (currentFilters.organic !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.organic === currentFilters.organic);
    }

    if (currentFilters.glutenFree !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.glutenFree === currentFilters.glutenFree);
    }

    if (currentFilters.vegan !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.vegan === currentFilters.vegan);
    }

    if (currentFilters.minStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => 
        parseInt(p.stock) >= currentFilters.minStock!
      );
    }

    if (currentFilters.maxStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => 
        parseInt(p.stock) <= currentFilters.maxStock!
      );
    }

    return filteredProducts;
  }, []);

  const calculateRelevance = useCallback((product: ProductFormData, searchLower: string): { relevance: number; matchedFields: string[] } => {
    const matchedFields: string[] = [];
    let relevance = 0;
    
    const searchableFields = [
      { field: product.name, name: 'Nombre' },
      { field: product.sku, name: 'SKU' },
      { field: product.barcode, name: 'Código de Barras' },
      { field: product.brand, name: 'Marca' },
      { field: product.flavor, name: 'Sabor' },
      { field: product.provider, name: 'Proveedor' },
      { field: product.commercialName, name: 'Nombre Comercial' },
      { field: product.line, name: 'Línea' },
      { field: product.size, name: 'Tamaño' },
      { field: product.weight, name: 'Peso' }
    ];

    searchableFields.forEach(({ field, name }) => {
      if (field.toLowerCase().includes(searchLower)) {
        matchedFields.push(name);
        relevance += name === 'Nombre' ? 10 : name === 'SKU' ? 8 : name === 'Código de Barras' ? 6 : name === 'Marca' ? 4 : name === 'Sabor' ? 3 : 1;
      }
    });

    // Bonus por coincidencias exactas
    if (product.name.toLowerCase() === searchLower) {
      relevance += 20;
    }
    if (product.sku.toLowerCase() === searchLower) {
      relevance += 15;
    }

    return { relevance: relevance || 1, matchedFields };
  }, []);

  const searchResults = useMemo(() => {
    // Primero aplicar filtros
    const filteredProducts = applyFilters(products, filters);

    // Luego aplicar búsqueda por término
    const finalProducts = searchTerm.trim() 
      ? filteredProducts.filter(product => {
          const searchLower = searchTerm.toLowerCase();
          const searchableFields = [
            product.name,
            product.sku,
            product.barcode,
            product.brand,
            product.flavor,
            product.provider,
            product.commercialName,
            product.line,
            product.size,
            product.weight
          ];

          return searchableFields.some(field => 
            field.toLowerCase().includes(searchLower)
          );
        })
      : filteredProducts;

    // Calcular relevancia y campos coincidentes
    const results: InventorySearchResult[] = finalProducts.map(product => {
      const { relevance, matchedFields } = searchTerm.trim() 
        ? calculateRelevance(product, searchTerm.toLowerCase())
        : { relevance: 1, matchedFields: [] };

      return {
        product,
        relevance,
        matchedFields
      };
    });

    // Ordenar por relevancia (descendente)
    return results.sort((a, b) => b.relevance - a.relevance);
  }, [products, searchTerm, filters, applyFilters, calculateRelevance]);

  const filteredProducts = useMemo(() => 
    searchResults.map(result => result.product), 
    [searchResults]
  );

  // Estadísticas de búsqueda
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const filteredCount = filteredProducts.length;
    const filterCount = Object.values(filters).filter(value => 
      value !== undefined && value !== '' && value !== false
    ).length;

    return {
      totalProducts,
      filteredCount,
      filterCount,
      hasActiveFilters: filterCount > 0,
      hasSearchTerm: searchTerm.trim().length > 0,
      percentage: totalProducts > 0 ? Math.round((filteredCount / totalProducts) * 100) : 0
    };
  }, [products, filteredProducts, searchTerm, filters]);

  return {
    searchResults,
    filteredProducts,
    stats
  };
}
