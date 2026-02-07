import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PointOfSaleTerminal from '../components/PointOfSaleTerminal';

describe('Barcode - Integración en Módulos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe mostrar código de barras en el catálogo', async () => {
    render(
      <MemoryRouter initialEntries={['/pos']}>
        <PointOfSaleTerminal />
      </MemoryRouter>
    );

    // Verificar que el primer producto tiene código de barras
    const firstProduct = screen.getByText(/1234567890123/);
    expect(firstProduct).toBeInTheDocument();
  });

  it('debe pasar el código de barras al agregar al carrito', async () => {
    render(
      <MemoryRouter initialEntries={['/pos']}>
        <PointOfSaleTerminal />
      </MemoryRouter>
    );

    // Simular agregar producto con código de barras
    const addButton = screen.getByRole('button', { name: /Agregar Proteína Whey Vainilla al carrito/i });
    fireEvent.click(addButton);

    // Verificar que el código de barras se pasa al carrito
    await vi.waitFor(() => {
      const cartItems = screen.queryAllByText(/1234567890123/);
      return cartItems.some(item => item.textContent?.includes('1234567890123'));
    }, { timeout: 1000 });
  });

  it('debe mostrar código de barras en el carrito', async () => {
    render(
      <MemoryRouter initialEntries={['/pos']}>
        <PointOfSaleTerminal />
      </MemoryRouter>
    );

    // Verificar que el código de barras aparece en el carrito
    const cartContent = screen.getByTestId('cart-items');
    expect(cartContent.textContent).toContain('1234567890123');
  });
});
