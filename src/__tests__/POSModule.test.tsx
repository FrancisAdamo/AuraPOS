import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PointOfSaleTerminal from '../components/PointOfSaleTerminal';

describe('PointOfSaleTerminal.tsx', () => {
  beforeEach(() => {
    // Reset antes de cada test
  });

  it('debe renderizar el módulo POS correctamente', () => {
    render(<PointOfSaleTerminal />);
    expect(screen.getByText(/Módulo de ventas \(POS\)/i)).toBeInTheDocument();
  });

  it('debe mostrar el campo de búsqueda de productos', () => {
    render(<PointOfSaleTerminal />);
    expect(screen.getByPlaceholderText(/Buscar productos/i)).toBeInTheDocument();
  });

  it('debe mostrar los productos disponibles', () => {
    render(<PointOfSaleTerminal />);
    expect(screen.getByText(/Proteína Whey Vainilla/i)).toBeInTheDocument();
    expect(screen.getByText(/Proteína Whey Chocolate/i)).toBeInTheDocument();
  });

  it('debe agregar un producto al carrito', () => {
    render(<PointOfSaleTerminal />);
    const occurrencesBefore = screen.getAllByText(/Proteína Whey Vainilla/i).length;
    const addButton = screen.getByRole('button', { name: /Agregar Proteína Whey Vainilla al carrito/i });
    fireEvent.click(addButton);
    
    // Verificar que el carrito se actualizó
    const occurrencesAfter = screen.getAllByText(/Proteína Whey Vainilla/i).length;
    expect(occurrencesAfter).toBeGreaterThan(occurrencesBefore);
  });

  it('debe mostrar el total del carrito', () => {
    render(<PointOfSaleTerminal />);
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();
  });

  it('debe permitir abrir el input de descuento', () => {
    render(<PointOfSaleTerminal />);
    const discountButton = screen.getByRole('button', { name: /Descuento/i });
    fireEvent.click(discountButton);
    expect(screen.getByPlaceholderText(/%/i)).toBeInTheDocument();
  });

  it('debe mostrar el botón de finalizar venta', () => {
    render(<PointOfSaleTerminal />);
    expect(screen.getByText(/Cobrar/i)).toBeInTheDocument();
  });

  it('debe filtrar productos por búsqueda', () => {
    render(<PointOfSaleTerminal />);
    const searchInput = screen.getByPlaceholderText(/Buscar productos/i);
    fireEvent.change(searchInput, { target: { value: 'Proteína' } });
    
    expect(screen.getByText(/Proteína Whey Vainilla/i)).toBeInTheDocument();
  });

  it('debe mostrar el carrito en el lado derecho', () => {
    render(<PointOfSaleTerminal />);
    // Buscar el título del carrito que es más específico
    expect(screen.getByRole('heading', { name: /Carrito/i })).toBeInTheDocument();
  });

  it('debe permitir aumentar cantidad de producto en carrito', () => {
    render(<PointOfSaleTerminal />);
    const addButton = screen.getByRole('button', { name: /Agregar Proteína Whey Vainilla al carrito/i });
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(screen.getByText(/x 2/i)).toBeInTheDocument();
  });

  it('debe permitir disminuir cantidad de producto en carrito', () => {
    render(<PointOfSaleTerminal />);
    const addButton = screen.getByRole('button', { name: /Agregar Proteína Whey Vainilla al carrito/i });
    fireEvent.click(addButton);

    const removeButton = screen.getByRole('button', { name: /Eliminar del carrito/i });
    fireEvent.click(removeButton);

    expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
  });
});
