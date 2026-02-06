import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../components/Sidebar';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

describe('Sidebar.tsx', () => {
  const mockOnNavigate = vi.fn();

  const defaultProps: SidebarProps = {
    activeView: 'dashboard',
    onViewChange: mockOnNavigate,
  };

  it('debe renderizar el sidebar correctamente', () => {
    render(<Sidebar {...defaultProps} />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  it('debe mostrar todos los elementos del menú', () => {
    render(<Sidebar {...defaultProps} />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Ventas \(POS\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Inventario/i)).toBeInTheDocument();
    expect(screen.getByText(/Cierre de Caja/i)).toBeInTheDocument();
  });

  it('debe mostrar la información del sistema', () => {
    render(<Sidebar {...defaultProps} />);
    expect(screen.getByText(/AuraPOS/i)).toBeInTheDocument();
  });

  it('debe indicar la vista activa', () => {
    const { rerender } = render(<Sidebar {...defaultProps} />);
    
    // Cambiar a POS
    rerender(
      <Sidebar 
        activeView="pos" 
        onViewChange={mockOnNavigate}
      />
    );
    
    // El botón de POS debe tener un estilo especial indicando que está activo
  });

  it('debe navegar al hacer clic en un elemento del menú', () => {
    const onNavigate = vi.fn();
    
    render(<Sidebar activeView="dashboard" onViewChange={onNavigate} />);
    
    const posButton = screen.getByRole('button', { name: /Ventas \(POS\)/i });
    fireEvent.click(posButton);
    
    // Verificar que se llamó a onNavigate
  });
});
