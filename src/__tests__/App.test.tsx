import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock de hooks para evitar errores de contexto
vi.mock('../hooks/useAuth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../hooks/useAuth')>();
  return {
    ...actual,
    useAuth: () => ({
      hasPermission: () => true,
      user: { name: 'Test User', role: 'owner' },
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(async () => {}),
      logout: vi.fn(),
    }),
  };
});

describe('App.tsx', () => {
  beforeEach(() => {
    // Reset del estado antes de cada test
  });

  it('debe renderizar el App correctamente', async () => {
    render(
      <MemoryRouter initialEntries={['/pos']}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Ventas \(POS\)/i)).toBeInTheDocument();
  });

  it('debe mostrar la vista POS por defecto al entrar en /', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Módulo de ventas \(POS\)/i)).toBeInTheDocument();
  });

  it('debe navegar a Dashboard cuando se hace clic en el link Dashboard', async () => {
    render(
      <MemoryRouter initialEntries={['/pos']}>
        <App />
      </MemoryRouter>
    );

    const dashboardLink = screen.getByRole('link', { name: /Navegar a Dashboard/i });
    fireEvent.click(dashboardLink);

    expect(screen.getByRole('link', { name: /Navegar a Dashboard/i })).toHaveAttribute('aria-current', 'page');
  });

  it('debe navegar a Inventario cuando se hace clic en el link Inventario', async () => {
    render(
      <MemoryRouter initialEntries={['/pos']}>
        <App />
      </MemoryRouter>
    );

    const inventoryLink = screen.getByRole('link', { name: /Navegar a Inventario/i });
    fireEvent.click(inventoryLink);
    expect(await screen.findByRole('link', { name: /Inventario/i })).toBeInTheDocument();
  });

  it('debe abrir la paleta de comandos con Cmd+K', () => {
    render(
      <MemoryRouter initialEntries={['/pos']}>
        <App />
      </MemoryRouter>
    );
    
    // Simular el evento de teclado correctamente
    fireEvent.keyDown(document, {
      key: 'k',
      metaKey: true,
      code: 'KeyK'
    });
    
    // Verificar que se haya activado el CommandPalette
    expect(screen.getByPlaceholderText(/Escribe un comando o presiona ESC para cerrar/i)).toBeInTheDocument();
  });

  it('debe mostrar el indicador Cmd+K en la pantalla', () => {
    render(
      <MemoryRouter initialEntries={['/pos']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/\+ K para comandos/i)).toBeInTheDocument();
  });

  it('debe abrir AuraBrain cuando se hace clic en el botón flotante', () => {
    render(
      <MemoryRouter initialEntries={['/pos']}>
        <App />
      </MemoryRouter>
    );
    const auraBrainButton = screen.getByRole('button', { name: /Activar asistente Aura Brain/i });
    fireEvent.click(auraBrainButton);
    expect(screen.getByText(/Hola! Soy Aura Brain/i)).toBeInTheDocument();
  });
});
