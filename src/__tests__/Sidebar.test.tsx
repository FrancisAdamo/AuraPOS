import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

// Mock del hook useAuth
vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    hasPermission: () => true,
    user: { name: 'Test User' },
    logout: vi.fn()
  })
}));

describe('Sidebar.tsx', () => {
  it('debe renderizar el sidebar correctamente', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  it('debe mostrar todos los elementos del menú', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Ventas \(POS\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Inventario/i)).toBeInTheDocument();
    expect(screen.getByText(/Cierre de Caja/i)).toBeInTheDocument();
  });

  it('debe mostrar la información del sistema', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByText(/AuraPOS/i)).toBeInTheDocument();
  });

  it('debe navegar al hacer clic en un elemento del menú', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const posLink = screen.getByRole('link', { name: /Navegar a Ventas \(POS\)/i });
    fireEvent.click(posLink);

    expect(posLink).toHaveAttribute('href', '/pos');
  });
});
