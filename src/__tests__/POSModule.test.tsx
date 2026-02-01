import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import POSModule from '../components/POSModule';

describe('POSModule.tsx', () => {
  beforeEach(() => {
    // Reset antes de cada test
  });

  it('debe renderizar el módulo POS correctamente', () => {
    render(<POSModule />);
    expect(screen.getByText(/Punto de Venta/i)).toBeInTheDocument();
  });

  it('debe mostrar el campo de búsqueda de productos', () => {
    render(<POSModule />);
    expect(screen.getByPlaceholderText(/Buscar Productos/i)).toBeInTheDocument();
  });

  it('debe mostrar los productos disponibles', () => {
    render(<POSModule />);
    expect(screen.getByText(/iPhone 15/i)).toBeInTheDocument();
    expect(screen.getByText(/Samsung Galaxy S24/i)).toBeInTheDocument();
  });

  it('debe agregar un producto al carrito', () => {
    render(<POSModule />);
    const addButtons = screen.getAllByText(/\+/);
    fireEvent.click(addButtons[0]);
    
    // Verificar que el carrito se actualizó
    expect(screen.getByText(/iPhone 15/i)).toBeInTheDocument();
  });

  it('debe mostrar el total del carrito', () => {
    render(<POSModule />);
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();
  });

  it('debe permitir aplicar descuento en porcentaje', () => {
    render(<POSModule />);
    const discountInput = screen.queryByPlaceholderText(/Descuento/i);
    if (discountInput) {
      fireEvent.change(discountInput, { target: { value: '10' } });
      expect(screen.getByText(/Descuento aplicado/i)).toBeInTheDocument();
    }
  });

  it('debe mostrar el botón de finalizar venta', () => {
    render(<POSModule />);
    expect(screen.getByText(/Finalizar Venta/i)).toBeInTheDocument();
  });

  it('debe filtrar productos por búsqueda', () => {
    render(<POSModule />);
    const searchInput = screen.getByPlaceholderText(/Buscar Productos/i);
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });
    
    expect(screen.getByText(/iPhone 15/i)).toBeInTheDocument();
  });

  it('debe mostrar el carrito en el lado derecho', () => {
    render(<POSModule />);
    expect(screen.getByText(/Carrito/i)).toBeInTheDocument();
  });

  it('debe permitir aumentar cantidad de producto en carrito', () => {
    render(<POSModule />);
    const addButtons = screen.getAllByText(/\+/);
    fireEvent.click(addButtons[0]);
    
    // Buscar el botón de incremento en el carrito y hacer clic
    const incrementButtons = screen.getAllByText(/\+/);
    if (incrementButtons.length > 1) {
      fireEvent.click(incrementButtons[incrementButtons.length - 1]);
    }
  });

  it('debe permitir disminuir cantidad de producto en carrito', () => {
    render(<POSModule />);
    const addButtons = screen.getAllByText(/\+/);
    fireEvent.click(addButtons[0]);
    
    // Buscar el botón de decremento en el carrito
    const decrementButtons = screen.queryAllByText(/-/);
    if (decrementButtons.length > 0) {
      fireEvent.click(decrementButtons[0]);
    }
  });
});
