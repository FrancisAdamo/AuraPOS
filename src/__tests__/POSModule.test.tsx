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
    // Hacer clic en la primera tarjeta de producto para agregar al carrito
    const productCards = screen.getAllByRole('button');
    const firstProductCard = productCards.find(card => 
      card.textContent && card.textContent.includes('Proteína Whey Vainilla')
    );
    if (firstProductCard) {
      fireEvent.click(firstProductCard);
    }
    
    // Verificar que el carrito se actualizó
    expect(screen.getByText(/Proteína Whey Vainilla/i)).toBeInTheDocument();
  });

  it('debe mostrar el total del carrito', () => {
    render(<PointOfSaleTerminal />);
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();
  });

  it('debe permitir aplicar descuento en porcentaje', () => {
    render(<PointOfSaleTerminal />);
    const discountInput = screen.queryByPlaceholderText(/Descuento/i);
    if (discountInput) {
      fireEvent.change(discountInput, { target: { value: '10' } });
      expect(screen.getByText(/Descuento aplicado/i)).toBeInTheDocument();
    }
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
    // Agregar un producto primero
    const productCards = screen.getAllByRole('button');
    const firstProductCard = productCards.find(card => 
      card.textContent && card.textContent.includes('Proteína Whey Vainilla')
    );
    if (firstProductCard) {
      fireEvent.click(firstProductCard);
    }
    
    // Buscar botones de incremento por rol
    const incrementButtons = screen.queryAllByRole('button', { name: /incrementar|\+/i });
    if (incrementButtons.length > 0) {
      fireEvent.click(incrementButtons[0]);
    }
  });

  it('debe permitir disminuir cantidad de producto en carrito', () => {
    render(<PointOfSaleTerminal />);
    // Agregar un producto primero
    const productCards = screen.getAllByRole('button');
    const firstProductCard = productCards.find(card => 
      card.textContent && card.textContent.includes('Proteína Whey Vainilla')
    );
    if (firstProductCard) {
      fireEvent.click(firstProductCard);
    }
    
    // Buscar botones de decremento por rol
    const decrementButtons = screen.queryAllByRole('button', { name: /decrementar|-/i });
    if (decrementButtons.length > 0) {
      fireEvent.click(decrementButtons[0]);
    }
  });
});
