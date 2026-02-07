import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PointOfSaleTerminal from '../components/PointOfSaleTerminal';

describe('Checkout - Procesamiento de Ventas', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe procesar venta correctamente', async () => {
    // Mock del hook useCart con datos de prueba
    const { useCart } = await import('../hooks/useCart.ts');
    vi.mocked(useCart).mockReturnValue({
      items: [
        {
          productId: '1',
          productName: 'Proteína Whey Vainilla',
          unitPrice: 45.99,
          quantity: 2,
          subtotal: 91.98
        }
      ],
      addItem: vi.fn(),
      removeItem: vi.fn(),
      clearCart: vi.fn(),
      total: 91.98,
      itemCount: 2,
      isEmpty: false,
    });

    render(
      <MemoryRouter initialEntries={['/pos']}>
        <PointOfSaleTerminal />
      </MemoryRouter>
    );

    // Verificar que el botón Cobrar existe
    const checkoutButton = screen.getByRole('button', { name: /Cobrar/i });
    expect(checkoutButton).toBeInTheDocument();

    // Simular clic en el botón Cobrar
    fireEvent.click(checkoutButton);

    // Verificar mensaje de confirmación
    expect(await screen.findByText(/Venta procesada exitosamente/i)).toBeInTheDocument();
  });

  it('debe mostrar mensaje de carrito vacío si intenta cobrar sin productos', async () => {
    // Mock del hook useCart con carrito vacío
    const { useCart } = await import('../hooks/useCart.ts');
    vi.mocked(useCart).mockReturnValue({
      items: [],
      addItem: vi.fn(),
      removeItem: vi.fn(),
      clearCart: vi.fn(),
      total: 0,
      itemCount: 0,
      isEmpty: true,
    });

    render(
      <MemoryRouter initialEntries={['/pos']}>
        <PointOfSaleTerminal />
      </MemoryRouter>
    );

    const checkoutButton = screen.getByRole('button', { name: /Cobrar/i });
    fireEvent.click(checkoutButton);

    // No debe mostrar mensaje de confirmación
    expect(screen.queryByText(/Venta procesada exitosamente/i)).not.toBeInTheDocument();
  });

  it('debe calcular descuento correctamente', async () => {
    // Mock del hook useCart con datos de prueba
    const { useCart } = await import('../hooks/useCart.ts');
    vi.mocked(useCart).mockReturnValue({
      items: [
        {
          productId: '1',
          productName: 'Proteína Whey Vainilla',
          unitPrice: 45.99,
          quantity: 2,
          subtotal: 91.98
        }
      ],
      addItem: vi.fn(),
      removeItem: vi.fn(),
      clearCart: vi.fn(),
      total: 91.98,
      itemCount: 2,
      isEmpty: false,
    });

    render(
      <MemoryRouter initialEntries={['/pos']}>
        <PointOfSaleTerminal />
      </MemoryRouter>
    );

    // Simular descuento del 10%
    const discountButton = screen.getByRole('button', { name: /Descuento/i });
    fireEvent.click(discountButton);

    const discountInput = screen.getByPlaceholderText(/%/i);
    fireEvent.change(discountInput, { target: { value: '10' } });

    // Verificar que el total se actualiza con descuento
    const totalElement = screen.getByText(/Total:/i);
    expect(totalElement.parentElement?.textContent).toContain('41.39'); // 45.99 * 0.9
  });
});
