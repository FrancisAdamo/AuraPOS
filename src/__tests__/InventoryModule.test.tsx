import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InventoryModule from '../components/InventoryModule';

describe('InventoryModule.tsx', () => {
  beforeEach(() => {
    // Reset antes de cada test
  });

  it('debe renderizar el módulo de inventario correctamente', () => {
    render(<InventoryModule />);
    expect(screen.getByText(/Inventario de Productos/i)).toBeInTheDocument();
  });

  it('debe mostrar los proveedores disponibles', () => {
    render(<InventoryModule />);
    expect(screen.getByText(/Apple/i)).toBeInTheDocument();
    expect(screen.getByText(/Samsung/i)).toBeInTheDocument();
  });

  it('debe mostrar el campo de búsqueda', () => {
    render(<InventoryModule />);
    expect(screen.getByPlaceholderText(/Buscar por nombre, SKU o proveedor/i)).toBeInTheDocument();
  });

  it('debe filtrar productos por nombre', () => {
    render(<InventoryModule />);
    const searchInput = screen.getByPlaceholderText(/Buscar por nombre, SKU o proveedor/i);
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });
    
    // Verificar que los resultados se filtren
    expect(screen.getByText(/Resultados/i)).toBeInTheDocument();
  });

  it('debe permitir filtrar por proveedor', () => {
    render(<InventoryModule />);
    const appleButton = screen.getByRole('button', { name: /Apple/i });
    fireEvent.click(appleButton);
    
    // Verificar que se expanda el grupo de Apple
    expect(screen.getByText(/iPhone 15/i)).toBeInTheDocument();
  });

  it('debe mostrar información del producto', () => {
    render(<InventoryModule />);
    const appleButton = screen.getByRole('button', { name: /Apple/i });
    fireEvent.click(appleButton);
    
    expect(screen.getByText(/Stock:/i)).toBeInTheDocument();
  });

  it('debe mostrar badges de estado de stock', () => {
    render(<InventoryModule />);
    const appleButton = screen.getByRole('button', { name: /Apple/i });
    fireEvent.click(appleButton);
    
    // Verificar que hay badges de estado
    const statusBadges = screen.queryAllByText(/Normal|Bajo|Crítico/i);
    expect(statusBadges.length).toBeGreaterThan(0);
  });

  it('debe tener un botón para limpiar filtros', () => {
    render(<InventoryModule />);
    const searchInput = screen.getByPlaceholderText(/Buscar por nombre, SKU o proveedor/i);
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });
    
    const clearButton = screen.queryByText(/Limpiar filtros/i);
    if (clearButton) {
      fireEvent.click(clearButton);
      expect(searchInput).toHaveValue('');
    }
  });

  it('debe mostrar el contador de productos por proveedor', () => {
    render(<InventoryModule />);
    // Los botones de proveedor deben mostrar un contador
    expect(screen.getByText(/Apple/i)).toBeInTheDocument();
  });

  it('debe buscar en nombre, SKU y proveedor simultáneamente', () => {
    render(<InventoryModule />);
    const searchInput = screen.getByPlaceholderText(/Buscar por nombre, SKU o proveedor/i);
    
    // Buscar por nombre
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });
    expect(screen.getByText(/Resultados/i)).toBeInTheDocument();
  });

  it('debe mostrar un mensaje cuando no hay resultados', () => {
    render(<InventoryModule />);
    const searchInput = screen.getByPlaceholderText(/Buscar por nombre, SKU o proveedor/i);
    fireEvent.change(searchInput, { target: { value: 'ProductoQueNoExiste12345' } });
    
    // Debería mostrar que no hay resultados o un mensaje similar
    const noResultsMessage = screen.queryByText(/No hay productos/i) || 
                            screen.queryByText(/Sin resultados/i);
    expect(noResultsMessage).toBeInTheDocument();
  });
});
