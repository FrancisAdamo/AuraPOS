import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductForm } from '../components/inventory/ProductForm';
import type { ProductFormData } from '../schemas/inventory';

describe('ProductForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  const defaultProps = {
    onSubmit: mockOnSubmit,
    onCancel: mockOnCancel,
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  it('debería renderizar todos los campos del formulario', () => {
    render(<ProductForm {...defaultProps} />);
    
    expect(screen.getByLabelText('Nombre del Producto *')).toBeInTheDocument();
    expect(screen.getByLabelText('SKU *')).toBeInTheDocument();
    expect(screen.getByLabelText('Proveedor *')).toBeInTheDocument();
    expect(screen.getByLabelText('Stock *')).toBeInTheDocument();
    expect(screen.getByLabelText('Código de Barras')).toBeInTheDocument();
    expect(screen.getByLabelText('Marca')).toBeInTheDocument();
    expect(screen.getByLabelText('Sabor')).toBeInTheDocument();
    expect(screen.getByLabelText('Formato')).toBeInTheDocument();
  });

  it('debería mostrar atributos especiales', () => {
    render(<ProductForm {...defaultProps} />);
    
    expect(screen.getByText('Atributos Especiales')).toBeInTheDocument();
    expect(screen.getByLabelText('Orgánico')).toBeInTheDocument();
    expect(screen.getByLabelText('Sin TACC')).toBeInTheDocument();
    expect(screen.getByLabelText('Vegano')).toBeInTheDocument();
  });

  it('debería mostrar errores de validación para campos requeridos', async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /Guardar Producto/i });
    await user.click(submitButton);
    
    expect(screen.getByText(/El nombre debe tener al menos 3 caracteres/)).toBeInTheDocument();
    expect(screen.getByText(/El SKU debe tener al menos 3 caracteres/)).toBeInTheDocument();
    expect(screen.getByText(/El proveedor debe tener al menos 2 caracteres/)).toBeInTheDocument();
  });

  it('debería validar formato de SKU', async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);
    
    const skuInput = screen.getByLabelText('SKU *');
    await user.type(skuInput, 'sku-invalido');
    
    expect(screen.getByText(/El SKU solo puede contener letras mayúsculas, números y guiones/)).toBeInTheDocument();
  });

  it('debería validar formato de código de barras', async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);
    
    const barcodeInput = screen.getByLabelText('Código de Barras');
    await user.type(barcodeInput, 'abc-123');
    
    expect(screen.getByText(/El código de barras solo puede contener números/)).toBeInTheDocument();
  });

  it('debería validar formato de peso', async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);
    
    const weightInput = screen.getByLabelText('Peso');
    await user.type(weightInput, 'peso-invalido');
    
    expect(screen.getByText(/Peso inválido. Ej: 500g, 1.5kg, 250ml/)).toBeInTheDocument();
  });

  it('debería llamar onSubmit con datos válidos', async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);
    
    await user.type(screen.getByLabelText('Nombre del Producto *'), 'Proteína Whey Vainilla');
    await user.type(screen.getByLabelText('SKU *'), 'PROTEIN-WHEY-VAN-1KG');
    await user.type(screen.getByLabelText('Proveedor *'), 'NutriFit Pro');
    await user.type(screen.getByLabelText('Stock *'), '50');
    
    const submitButton = screen.getByRole('button', { name: /Guardar Producto/i });
    await user.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Proteína Whey Vainilla',
      sku: 'PROTEIN-WHEY-VAN-1KG',
      provider: 'NutriFit Pro',
      stock: 50,
      barcode: '',
      size: '',
      flavor: '',
      brand: '',
      line: '',
      format: undefined,
      weight: '',
      commercialName: '',
      organic: false,
      glutenFree: false,
      vegan: false,
    });
  });

  it('debería llamar onCancel al hacer clic en Cancelar', async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);
    
    const cancelButton = screen.getByRole('button', { name: 'Cancelar' });
    await user.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('debería manejar atributos especiales', async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);
    
    await user.click(screen.getByLabelText('Orgánico'));
    await user.click(screen.getByLabelText('Sin TACC'));
    await user.click(screen.getByLabelText('Vegano'));
    
    const submitButton = screen.getByRole('button', { name: /Guardar Producto/i });
    await user.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        organic: true,
        glutenFree: true,
        vegan: true,
      })
    );
  });

  it('debería mostrar valores por defecto si se proporcionan', () => {
    const defaultValues: Partial<ProductFormData> = {
      name: 'Producto Existente',
      sku: 'EXISTENTE-001',
      provider: 'Proveedor Test',
      stock: 25,
      organic: true,
    };
    
    render(
      <ProductForm 
        {...defaultProps} 
        defaultValues={defaultValues} 
      />
    );
    
    expect(screen.getByDisplayValue('Producto Existente')).toBeInTheDocument();
    expect(screen.getByDisplayValue('EXISTENTE-001')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Proveedor Test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
    expect(screen.getByLabelText('Orgánico')).toBeChecked();
  });

  it('debería deshabilitar botón de envío cuando hay errores', async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /Guardar Producto/i });
    expect(submitButton).not.toBeDisabled();
    
    await user.type(screen.getByLabelText('Nombre del Producto *'), 'ab');
    await user.click(submitButton);
    
    expect(submitButton).toBeDisabled();
  });

  it('debería mostrar loading state', () => {
    render(
      <ProductForm 
        {...defaultProps} 
        isLoading={true} 
      />
    );
    
    expect(screen.getByText('Guardando...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Guardar Producto/i })).toBeDisabled();
  });

  it('debería mostrar error general si se proporciona', () => {
    const errorMessage = 'Error al guardar el producto';
    mockOnSubmit.mockRejectedValue(new Error(errorMessage));
    
    render(<ProductForm {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /Guardar Producto/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('debería seleccionar formato correctamente', async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);
    
    const formatSelect = screen.getByLabelText('Formato');
    await user.selectOptions(formatSelect, 'Polvo');
    
    expect(screen.getByDisplayValue('Polvo')).toBeInTheDocument();
  });
});
