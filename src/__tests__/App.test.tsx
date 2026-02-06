import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock de hooks para evitar errores de contexto
vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    hasPermission: () => true,
    user: { name: 'Test User' },
    logout: vi.fn()
  })
}));

vi.mock('../hooks/useStore', () => ({
  useStore: () => ({
    store: { id: '1', name: 'Test Store' }
  })
}));

describe('App.tsx', () => {
  beforeEach(() => {
    // Reset del estado antes de cada test
  });

  it('debe renderizar el App correctamente', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /Dashboard/i })).toBeInTheDocument();
  });

  it('debe mostrar la vista Dashboard por defecto', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Dashboard/i })).toBeInTheDocument();
  });

  it('debe navegar a POS cuando se hace clic en el botón POS', () => {
    render(<App />);
    const posButton = screen.getByRole('button', { name: /Ventas \(POS\)/i });
    fireEvent.click(posButton);
    expect(screen.getByText(/Módulo de ventas \(POS\)/i)).toBeInTheDocument();
  });

  it('debe navegar a Inventory cuando se hace clic en el botón Inventory', () => {
    render(<App />);
    const inventoryButton = screen.getByRole('button', { name: /Inventario/i });
    fireEvent.click(inventoryButton);
    expect(screen.getByText(/Módulo de inventario/i)).toBeInTheDocument();
  });

  it('debe abrir la paleta de comandos con Cmd+K', () => {
    render(<App />);
    
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
    render(<App />);
    expect(screen.getByText(/\+ K para comandos/i)).toBeInTheDocument();
  });

  it('debe abrir AuraBrain cuando se hace clic en el botón flotante', () => {
    render(<App />);
    const auraBrainButton = screen.getByRole('button', { name: /Aura Brain/i });
    fireEvent.click(auraBrainButton);
    expect(screen.getByText(/Hola! Soy Aura Brain/i)).toBeInTheDocument();
  });
});
