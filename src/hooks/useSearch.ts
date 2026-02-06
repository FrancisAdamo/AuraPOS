import { useState, useMemo } from 'react';

interface UseSearchOptions<T> {
  items: T[];
  searchFields: (keyof T)[];
  filterFn?: (item: T, searchTerm: string) => boolean;
}

export function useSearch<T extends Record<string, any>>(
  items: T[],
  searchFields: (keyof T)[],
  options: Partial<UseSearchOptions<T>> = {}
) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    
    const term = searchTerm.toLowerCase();
    
    return items.filter(item => {
      // Búsqueda por defecto en los campos especificados
      const matchesSearchField = searchFields.some(field => {
        const fieldValue = item[field];
        return fieldValue && String(fieldValue).toLowerCase().includes(term);
      });
      
      // Usar función de filtro personalizada si se proporciona
      if (options.filterFn) {
        return options.filterFn(item, term);
      }
      
      return matchesSearchField;
    });
  }, [items, searchTerm, searchFields, options.filterFn]);
  
  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    hasResults: filteredItems.length > 0,
    resultCount: filteredItems.length,
  };
}
