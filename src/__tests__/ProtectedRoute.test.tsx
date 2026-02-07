import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ProtectedRoute.tsx', () => {
  it('debe mostrar LoginForm cuando no está autenticado', async () => {
    vi.resetModules();
    vi.doMock('../hooks/useAuth', () => ({
      useAuth: () => ({
        hasPermission: () => true,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: vi.fn(async () => {}),
        logout: vi.fn(),
      }),
    }));

    const { ProtectedRoute } = await import('../components/auth/ProtectedRoute');

    render(
      <ProtectedRoute>
        <div>PRIVATE</div>
      </ProtectedRoute>
    );

    expect(screen.getByText(/Acceso Rápido \(Demo\)/i)).toBeInTheDocument();
    expect(screen.queryByText('PRIVATE')).not.toBeInTheDocument();
  });

  it('debe mostrar acceso denegado cuando no hay permiso requerido', async () => {
    vi.resetModules();
    vi.doMock('../hooks/useAuth', () => ({
      useAuth: () => ({
        hasPermission: () => false,
        isAuthenticated: true,
        isLoading: false,
        user: { id: '1', name: 'User', email: 'x@y.com', role: 'vendor' },
        login: vi.fn(async () => {}),
        logout: vi.fn(),
      }),
    }));

    const { ProtectedRoute } = await import('../components/auth/ProtectedRoute');

    render(
      <ProtectedRoute requiredPermission="view_closing">
        <div>PRIVATE</div>
      </ProtectedRoute>
    );

    expect(screen.getByText(/Acceso Denegado/i)).toBeInTheDocument();
    expect(screen.queryByText('PRIVATE')).not.toBeInTheDocument();
  });
});
