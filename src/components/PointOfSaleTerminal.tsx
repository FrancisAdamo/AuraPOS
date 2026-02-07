import { Trash2, CheckCircle, Percent } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { PRODUCT_CATALOG } from '../data/products';
import { useSearch } from '../hooks';
import { useCart } from '../hooks';
import { Card, Button, Input } from './ui';
import type { ProductSaleItem } from '../types/products';

export default function PointOfSaleTerminal() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { searchTerm, setSearchTerm, filteredItems } = useSearch([...PRODUCT_CATALOG], ['name']);
  const { items, addItem, removeItem, clearCart, total, isEmpty } = useCart();

  // Autofocus en input de búsqueda
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const addToCart = (product: typeof PRODUCT_CATALOG[0]) => {
    const saleItem: ProductSaleItem = {
      productId: String(product.id),
      productName: product.name,
      unitPrice: product.unitPrice,
      quantity: 1,
      subtotal: product.unitPrice,
      barcode: product.barcode,
    };
    addItem(saleItem);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const removeFromCart = (productId: string) => {
    removeItem(productId);
  };

  const handleCheckout = () => {
    if (isEmpty) {
      return;
    }

    // Calcular total con descuento
    const discountedTotal = total * (1 - discountPercentage / 100);
    
    // Simular procesamiento de venta
    console.log('Procesando venta:', {
      items: items.length,
      subtotal: total,
      discount: discountPercentage,
      total: discountedTotal
    });

    // Vaciar carrito
    clearCart();
    
    // Resetear descuento
    setDiscountPercentage(0);
    setShowDiscountInput(false);
    
    // Mostrar confirmación
    setShowCheckoutSuccess(true);
    setTimeout(() => setShowCheckoutSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-notion-primary m-0">
          Módulo de ventas (POS)
        </h1>
        <p className="text-notion-secondary mt-1 mb-8">
          Selecciona productos para registrar ventas
        </p>
      </div>

      <div className="flex gap-8 flex-1">
        {/* Catálogo de productos */}
        <div className="flex-1">
          <Input
            inputRef={searchInputRef}
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            variant="search"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {filteredItems.map(product => (
              <Card 
                key={product.sku} 
                className="hover:shadow-md transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-notion-primary m-0 mb-2 truncate">
                        {product.name}
                      </h3>
                      <p className="text-notion-secondary text-base m-0">
                        ${product.unitPrice.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => addToCart(product)}
                      aria-label={`Agregar ${product.name} al carrito`}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Carrito de compras */}
        <div className="w-96">
          <Card variant="elevated">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-notion-primary mb-4 m-0">
                Carrito
              </h2>

              {/* Items del carrito */}
              <div className="flex flex-col gap-3 mb-4 max-h-80 overflow-y-auto">
                {isEmpty ? (
                  <p className="text-center text-notion-secondary py-8">
                    El carrito está vacío
                  </p>
                ) : (
                  items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center p-3 border-b border-notion-border">
                      <div>
                        <p className="font-medium text-sm m-0 mb-1">
                          {item.productName}
                        </p>
                        <p className="text-notion-secondary text-xs m-0">
                          ${item.unitPrice.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          ${(item.quantity * item.unitPrice).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                          aria-label="Eliminar del carrito"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total y acciones */}
              <div className="border-t-2 border-notion-border pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-xl">
                    ${(total * (1 - discountPercentage / 100)).toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2 mb-4 justify-end">
                  <Button
                    onClick={() => setShowDiscountInput(!showDiscountInput)}
                    variant="ghost"
                    size="sm"
                  >
                    <Percent size={16} />
                    Descuento
                  </Button>
                  
                  {showDiscountInput && (
                    <input
                      type="number"
                      value={discountPercentage === 0 ? '' : discountPercentage}
                      onChange={(e) => setDiscountPercentage(parseFloat(e.target.value) || 0)}
                      placeholder="%"
                      className="w-20 p-2 border border-notion-border rounded text-sm"
                      style={{ maxWidth: '25%' }}
                    />
                  )}
                </div>

                <div className="flex gap-2">
                  <Button onClick={clearCart} variant="secondary" size="sm">
                    Vaciar
                  </Button>
                  <Button onClick={handleCheckout} variant="primary" size="sm">
                    <CheckCircle size={16} />
                    Cobrar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="fixed top-8 right-8 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          ✓ Producto agregado al carrito
        </div>
      )}

      {/* Mensaje de confirmación de venta */}
      {showCheckoutSuccess && (
        <div className="fixed top-8 right-8 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50">
          ✓ Venta procesada exitosamente
        </div>
      )}
    </div>
  );
}
