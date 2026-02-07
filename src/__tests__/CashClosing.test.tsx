import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CashClosing from '../components/CashClosing';

describe('CashClosing.tsx', () => {
  beforeEach(() => {
    // Reset antes de cada test
  });

  it('debe renderizar el módulo de cierre correctamente', () => {
    render(<CashClosing />);
    expect(screen.getByText(/Cierre y Apertura de Caja/i)).toBeInTheDocument();
  });

  it('debe mostrar las tres pestañas: Resumen, Cierre, Apertura', () => {
    render(<CashClosing />);
    expect(screen.getByRole('button', { name: /Resumen/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cierre/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Apertura/i })).toBeInTheDocument();
  });

  it('debe mostrar el resumen del día inicial', () => {
    render(<CashClosing />);
    expect(screen.getByText(/2845/)).toBeInTheDocument(); // Total bruto
    expect(screen.getByText(/950/)).toBeInTheDocument(); // Efectivo
  });

  it('debe navegar a la pestaña Cierre cuando se hace clic', () => {
    render(<CashClosing />);
    const closingTab = screen.getByRole('button', { name: /Cierre/i });
    fireEvent.click(closingTab);
    expect(screen.getByText(/Efectivo Contado Manualmente/i)).toBeInTheDocument();
  });

  it('debe validar el monto de efectivo contado', () => {
    render(<CashClosing />);
    const closingTab = screen.getByRole('button', { name: /Cierre/i });
    fireEvent.click(closingTab);
    
    const input = screen.getByPlaceholderText(/Ingresa el monto contado/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '12500' } });
    
    expect(input.value).toBe('12500');
  });

  it('debe detectar discrepancia cuando el monto no coincide', () => {
    render(<CashClosing />);
    const closingTab = screen.getByRole('button', { name: /Cierre/i });
    fireEvent.click(closingTab);
    
    const input = screen.getByPlaceholderText(/Ingresa el monto contado/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '13000' } });
    
    expect(screen.getByText(/DISCREPANCIA DETECTADA/i)).toBeInTheDocument();
    expect(screen.getByText(/Nota de Discrepancia/i)).toBeInTheDocument();
  });

  it('debe permitir agregar un retiro de efectivo', () => {
    render(<CashClosing />);
    const closingTab = screen.getByRole('button', { name: /Cierre/i });
    fireEvent.click(closingTab);
    
    const addWithdrawalButton = screen.getByText(/Agregar Retiro/i);
    fireEvent.click(addWithdrawalButton);
    
    expect(screen.getByPlaceholderText(/Monto a retirar/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Motivo del retiro/i)).toBeInTheDocument();
  });

  it('debe desactivar la pestaña Apertura hasta que se complete el cierre', () => {
    render(<CashClosing />);
    const openingTab = screen.getAllByRole('button').find(button => 
      button.textContent?.includes('Apertura')
    );
    
    expect(openingTab).toHaveAttribute('disabled');
  });

  it('debe mostrar el resumen de efectivo en la pestaña de apertura', () => {
    render(<CashClosing />);
    const closingTab = screen.getByRole('button', { name: /Cierre/i });
    fireEvent.click(closingTab);
    
    const input = screen.getByPlaceholderText('Ingresa el monto contado') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '950' } });
    
    const confirmButton = screen.getByText(/Confirmar Cierre/i);
    fireEvent.click(confirmButton);

    expect(screen.getByRole('heading', { name: /Apertura de Caja - Día Siguiente/i })).toBeInTheDocument();
  });

  it('debe tener un checkbox para confirmar saldo inicial', () => {
    render(<CashClosing />);
    const closingTab = screen.getByRole('button', { name: /Cierre/i });
    fireEvent.click(closingTab);
    
    const input = screen.getByPlaceholderText('Ingresa el monto contado') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '950' } });
    
    const confirmButton = screen.getByText(/Confirmar Cierre/i);
    fireEvent.click(confirmButton);
    
    const checkbox = screen.getByRole('checkbox', { 
      name: /Confirmo que el saldo inicial es correcto/i 
    });
    expect(checkbox).toBeInTheDocument();
  });
});
