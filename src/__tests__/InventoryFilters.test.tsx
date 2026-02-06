import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InventoryFilters } from '../components/inventory/InventoryFilters';
import type { InventoryFilter } from '../types/inventory';

describe('InventoryFilters', () => {
  const mockOnFiltersChange = vi.fn();
  const defaultProps = {
    filters: {},
    onFiltersChange: mockOnFiltersChange,
    brands: ['NutriFit Pro', 'MuscleTech', 'HealthLife'],
    flavors: ['Vainilla', 'Chocolate', 'Fresa'],
    formats: ['Polvo', 'Líquido', 'Cápsulas']
  };

  beforeEach(() => {
    mockOnFiltersChange.mockClear();
  });

  it('debería renderizar el componente correctamente', () => {
    render(<InventoryFilters {...defaultProps} />);
    
    expect(screen.getByText('Filtros Avanzados')).toBeInTheDocument();
    expect(screen.getByText('Marca')).toBeInTheDocument();
    expect(screen.getByText('Sabor')).toBeInTheDocument();
    expect(screen.getByText('Formato')).toBeInTheDocument();
  });

  it('debería mostrar estado "Activos" cuando hay filtros activos', () => {
    const filtersWithActive: InventoryFilter = { brand: 'NutriFit Pro' };
    render(
      <InventoryFilters 
        {...defaultProps} 
        filters={filtersWithActive} 
      />
    );
    
    expect(screen.getByText('Activos')).toBeInTheDocument();
  });

  it('debería expandir y colapsar filtros', () => {
    render(<InventoryFilters {...defaultProps} />);
    
    const toggleButton = screen.getByText('Mostrar');
    expect(toggleButton).toBeInTheDocument();
    
    fireEvent.click(toggleButton);
    expect(screen.getByText('Ocultar')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Ocultar'));
    expect(screen.getByText('Mostrar')).toBeInTheDocument();
  });

  it('debería llamar onFiltersChange al cambiar marca', () => {
    render(<InventoryFilters {...defaultProps} />);
    
    // Expandir filtros primero
    fireEvent.click(screen.getByText('Mostrar'));
    
    const brandSelect = screen.getByLabelText('Marca');
    fireEvent.change(brandSelect, { target: { value: 'MuscleTech' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ brand: 'MuscleTech' })
    );
  });

  it('debería llamar onFiltersChange al cambiar sabor', () => {
    render(<InventoryFilters {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Mostrar'));
    
    const flavorSelect = screen.getByLabelText('Sabor');
    fireEvent.change(flavorSelect, { target: { value: 'Chocolate' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ flavor: 'Chocolate' })
    );
  });

  it('debería llamar onFiltersChange al cambiar formato', () => {
    render(<InventoryFilters {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Mostrar'));
    
    const formatSelect = screen.getByLabelText('Formato');
    fireEvent.change(formatSelect, { target: { value: 'Líquido' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ format: 'Líquido' })
    );
  });

  it('debería llamar onFiltersChange al cambiar stock mínimo', () => {
    render(<InventoryFilters {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Mostrar'));
    
    const minStockInput = screen.getByLabelText('Stock Mínimo');
    fireEvent.change(minStockInput, { target: { value: '10' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ minStock: 10 })
    );
  });

  it('debería llamar onFiltersChange al cambiar stock máximo', () => {
    render(<InventoryFilters {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Mostrar'));
    
    const maxStockInput = screen.getByLabelText('Stock Máximo');
    fireEvent.change(maxStockInput, { target: { value: '100' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ maxStock: 100 })
    );
  });

  it('debería llamar onFiltersChange al cambiar atributos especiales', () => {
    render(<InventoryFilters {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Mostrar'));
    
    const organicCheckbox = screen.getByLabelText('Orgánico');
    fireEvent.click(organicCheckbox);
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ organic: true })
    );
  });

  it('debería limpiar todos los filtros', () => {
    const filtersWithActive: InventoryFilter = { 
      brand: 'NutriFit Pro',
      flavor: 'Vainilla',
      organic: true,
      minStock: 10
    };
    
    render(
      <InventoryFilters 
        {...defaultProps} 
        filters={filtersWithActive} 
      />
    );
    
    fireEvent.click(screen.getByText('Mostrar'));
    fireEvent.click(screen.getByText('Limpiar'));
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({});
  });

  it('debería mostrar botón "Limpiar" solo cuando hay filtros activos', () => {
    const { rerender } = render(
      <InventoryFilters 
        {...defaultProps} 
        filters={{}} 
      />
    );
    
    expect(screen.queryByText('Limpiar')).not.toBeInTheDocument();
    
    rerender(
      <InventoryFilters 
        {...defaultProps} 
        filters={{ brand: 'NutriFit Pro' }} 
      />
    );
    
    expect(screen.getByText('Limpiar')).toBeInTheDocument();
  });

  it('debería mostrar todas las opciones de marca', () => {
    render(<InventoryFilters {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Mostrar'));
    
    const brandSelect = screen.getByLabelText('Marca');
    expect(brandSelect).toBeInTheDocument();
    
    // Verificar que contiene "Todas las marcas" y las opciones específicas
    expect(screen.getByText('Todas las marcas')).toBeInTheDocument();
    expect(screen.getByText('NutriFit Pro')).toBeInTheDocument();
    expect(screen.getByText('MuscleTech')).toBeInTheDocument();
    expect(screen.getByText('HealthLife')).toBeInTheDocument();
  });

  it('debería mostrar todos los formatos disponibles', () => {
    render(<InventoryFilters {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Mostrar'));
    
    const formatSelect = screen.getByLabelText('Formato');
    expect(formatSelect).toBeInTheDocument();
    
    expect(screen.getByText('Todos los formatos')).toBeInTheDocument();
    expect(screen.getByText('Polvo')).toBeInTheDocument();
    expect(screen.getByText('Líquido')).toBeInTheDocument();
    expect(screen.getByText('Cápsulas')).toBeInTheDocument();
    expect(screen.getByText('Tabletas')).toBeInTheDocument();
    expect(screen.getByText('Barritas')).toBeInTheDocument();
  });
});
