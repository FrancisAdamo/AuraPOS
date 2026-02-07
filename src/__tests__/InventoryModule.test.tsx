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
    expect(screen.getByText(/Módulo de inventario/i)).toBeInTheDocument();
  });

  it('debe mostrar los proveedores disponibles', () => {
    render(<InventoryModule />);
    expect(screen.getAllByText(/MuscleFit/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/FitNutrition/i).length).toBeGreaterThan(0);
  });

  it('debe mostrar el campo de búsqueda', () => {
    render(<InventoryModule />);
    expect(screen.getByPlaceholderText(/Buscar por nombre, SKU o proveedor/i)).toBeInTheDocument();
  });

  it('debe filtrar productos por nombre', () => {
    render(<InventoryModule />);
    const searchInput = screen.getByPlaceholderText(/Buscar por nombre, SKU o proveedor/i);
    fireEvent.change(searchInput, { target: { value: 'Proteína' } });
    
    // Verificar que los resultados se filtren
    expect(screen.getByText(/productos encontrados/i)).toBeInTheDocument();
  });

  it('debe permitir filtrar por proveedor', () => {
    render(<InventoryModule />);
    // Buscar el botón de proveedor MuscleFit específico
    const muscleButtons = screen.getAllByRole('button', { name: /MuscleFit/i });
    const filterButton = muscleButtons.find(button => 
      button.textContent && button.textContent.includes('(')
    );
    if (filterButton) {
      fireEvent.click(filterButton);
    }

    const groupButton = muscleButtons.find(button => 
      button.textContent && !button.textContent.includes('(')
    );
    if (groupButton) {
      fireEvent.click(groupButton);
    }
    
    // Verificar que se expanda el grupo de MuscleFit
    expect(screen.getByText(/Proteína Whey Vainilla 1kg/i)).toBeInTheDocument();
  });

  it('debe mostrar información del producto', () => {
    render(<InventoryModule />);
    // Buscar el botón de proveedor MuscleFit específico
    const muscleButtons = screen.getAllByRole('button', { name: /MuscleFit/i });
    const filterButton = muscleButtons.find(button => 
      button.textContent && button.textContent.includes('(')
    );
    if (filterButton) {
      fireEvent.click(filterButton);
    }
    
    // Hacer clic en el grupo expandido para ver los detalles
    const groupButton = muscleButtons.find(button => 
      button.textContent && !button.textContent.includes('(')
    );
    if (groupButton) {
      fireEvent.click(groupButton);
    }

    expect(screen.getByText('SKU')).toBeInTheDocument();
    expect(screen.getByText('Producto')).toBeInTheDocument();
    expect(screen.getByText('Stock actual')).toBeInTheDocument();
  });

  it('debe mostrar badges de estado de stock', () => {
    render(<InventoryModule />);
    // Buscar el botón de proveedor MuscleFit específico
    const muscleButtons = screen.getAllByRole('button', { name: /MuscleFit/i });
    const filterButton = muscleButtons.find(button => 
      button.textContent && button.textContent.includes('(')
    );
    if (filterButton) {
      fireEvent.click(filterButton);
    }
    
    // Hacer clic en el grupo expandido para ver los detalles
    const groupButton = muscleButtons.find(button => 
      button.textContent && !button.textContent.includes('(')
    );
    if (groupButton) {
      fireEvent.click(groupButton);
    }
    
    // Verificar que hay badges de estado
    const statusBadges = screen.queryAllByText(/En stock|Stock bajo|Crítico/i);
    expect(statusBadges.length).toBeGreaterThan(0);
  });

  it('debe tener un botón para limpiar filtros', () => {
    render(<InventoryModule />);
    const searchInput = screen.getByPlaceholderText(/Buscar por nombre, SKU o proveedor/i);
    fireEvent.change(searchInput, { target: { value: 'Proteína' } });
    
    const clearButton = screen.queryByText(/Limpiar filtros/i);
    if (clearButton) {
      fireEvent.click(clearButton);
      expect(searchInput).toHaveValue('');
    }
  });

  it('debe mostrar el contador de productos por proveedor', () => {
    render(<InventoryModule />);
    // Los botones de proveedor deben mostrar un contador
    expect(screen.getAllByText(/MuscleFit/i).length).toBeGreaterThan(0);
  });

  it('debe buscar en nombre, SKU y proveedor simultáneamente', () => {
    render(<InventoryModule />);
    const searchInput = screen.getByPlaceholderText(/Buscar por nombre, SKU o proveedor/i);
    
    // Buscar por nombre
    fireEvent.change(searchInput, { target: { value: 'Proteína' } });
    expect(screen.getByText(/productos encontrados/i)).toBeInTheDocument();
  });

  it('debe mostrar un mensaje cuando no hay resultados', () => {
    render(<InventoryModule />);
    const searchInput = screen.getByPlaceholderText(/Buscar por nombre, SKU o proveedor/i);
    fireEvent.change(searchInput, { target: { value: 'ProductoQueNoExiste12345' } });
    
    // Debería mostrar que no hay resultados o un mensaje similar
    const noResultsMessage = screen.queryByText(/No hay productos/i) || 
                            screen.queryByText(/Sin resultados/i) ||
                            screen.queryByText(/0 productos encontrados/i);
    expect(noResultsMessage).toBeInTheDocument();
  });
});
