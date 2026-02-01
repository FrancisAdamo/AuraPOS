import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

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
    expect(screen.getByText(/Cierre y Apertura de Caja/i)).toBeInTheDocument();
  });

  it('debe navegar a POS cuando se hace clic en el botón POS', () => {
    render(<App />);
    const posButton = screen.getByRole('button', { name: /Punto de Venta/i });
    fireEvent.click(posButton);
    expect(screen.getByText(/Buscar Productos/i)).toBeInTheDocument();
  });

  it('debe navegar a Inventory cuando se hace clic en el botón Inventory', () => {
    render(<App />);
    const inventoryButton = screen.getByRole('button', { name: /Inventario/i });
    fireEvent.click(inventoryButton);
    expect(screen.getByText(/Inventario de Productos/i)).toBeInTheDocument();
  });

  it('debe abrir la paleta de comandos con Cmd+K', () => {
    render(<App />);
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
    });
    fireEvent.keyDown(document, event);
    // Verificar que se haya activado el CommandPalette
    expect(screen.queryByPlaceholderText(/Escribe para buscar/i)).toBeInTheDocument();
  });

  it('debe mostrar el indicador Cmd+K en la pantalla', () => {
    render(<App />);
    expect(screen.getByText(/⌘K/i)).toBeInTheDocument();
  });

  it('debe abrir AuraBrain cuando se hace clic en el botón flotante', () => {
    render(<App />);
    const auraBrainButton = screen.getByRole('button', { name: /Aura Brain/i });
    fireEvent.click(auraBrainButton);
    expect(screen.getByText(/Hola, soy Aura Brain/i)).toBeInTheDocument();
  });
});
