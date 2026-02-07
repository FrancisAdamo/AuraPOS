import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('RBAC - Role-Based Access Control', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Rol: Vendor (Vendedor)', () => {
    beforeEach(() => {
      // Mock usuario vendor
      localStorage.setItem('aurapos_user', JSON.stringify({
        id: '2',
        name: 'Vendor User',
        email: 'vendor@aurapos.com',
        role: 'vendor',
      }));
    });

    it('debe permitir acceso a Ventas (POS)', async () => {
      render(
        <MemoryRouter initialEntries={['/pos']}>
          <App />
        </MemoryRouter>
      );
      expect(await screen.findByText(/Módulo de ventas \(POS\)/i)).toBeInTheDocument();
    });

    it('debe permitir acceso a Inventario', async () => {
      render(
        <MemoryRouter initialEntries={['/inventory']}>
          <App />
        </MemoryRouter>
      );
      expect(await screen.findByText(/Módulo de inventario/i)).toBeInTheDocument();
    });

    it('debe permitir acceso a Cierre de Caja', async () => {
      render(
        <MemoryRouter initialEntries={['/closing']}>
          <App />
        </MemoryRouter>
      );
      expect(await screen.findByText(/Cierre y Apertura de Caja/i)).toBeInTheDocument();
    });

    it('debe denegar acceso a Dashboard', async () => {
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>
      );
      expect(await screen.findByText(/Acceso Denegado/i)).toBeInTheDocument();
      expect(screen.getByText(/vendor/)).toBeInTheDocument();
    });
  });

  describe('Rol: Owner (Dueño)', () => {
    beforeEach(() => {
      // Mock usuario owner
      localStorage.setItem('aurapos_user', JSON.stringify({
        id: '1',
        name: 'Admin Owner',
        email: 'owner@aurapos.com',
        role: 'owner',
      }));
    });

    it('debe permitir acceso a Dashboard', async () => {
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>
      );
      expect(await screen.findByText(/Dashboard/i)).toBeInTheDocument();
    });

    it('debe permitir acceso a Ventas (POS)', async () => {
      render(
        <MemoryRouter initialEntries={['/pos']}>
          <App />
        </MemoryRouter>
      );
      expect(await screen.findByText(/Módulo de ventas \(POS\)/i)).toBeInTheDocument();
    });

    it('debe permitir acceso a Inventario', async () => {
      render(
        <MemoryRouter initialEntries={['/inventory']}>
          <App />
        </MemoryRouter>
      );
      expect(await screen.findByText(/Módulo de inventario/i)).toBeInTheDocument();
    });

    it('debe permitir acceso a Cierre de Caja', async () => {
      render(
        <MemoryRouter initialEntries={['/closing']}>
          <App />
        </MemoryRouter>
      );
      expect(await screen.findByText(/Cierre y Apertura de Caja/i)).toBeInTheDocument();
    });
  });
});
