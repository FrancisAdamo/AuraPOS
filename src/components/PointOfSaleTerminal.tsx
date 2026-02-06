import { Search, Plus, Trash2, CheckCircle, Percent } from 'lucide-react';
import { useState } from 'react';
import { PRODUCT_CATALOG } from '../data/products';
import { useSearch } from '../hooks';
import { useCart } from '../hooks';
import { Card, Button, Input } from './ui';
import type { ProductSaleItem } from '../types/products';

export default function PointOfSaleTerminal() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [showDiscountInput, setShowDiscountInput] = useState(false);

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(PRODUCT_CATALOG, ['name']);
  const { items, addItem, removeItem, clearCart, total, itemCount, isEmpty } = useCart();

  const addToCart = (product: typeof PRODUCT_CATALOG[0]) => {
    const saleItem: ProductSaleItem = {
      productId: product.sku,
      productName: product.name,
      unitPrice: product.unitPrice,
      quantity: 1,
      subtotal: product.unitPrice,
    };
    addItem(saleItem);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const removeFromCart = (productId: string) => {
    removeItem(productId);
  };

  const applyDiscount = () => {
    if (discountPercentage > 0 && discountPercentage <= 100) {
      // Lógica de descuento aquí
      setShowDiscountInput(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          color: '#37352f',
          margin: 0,
        }}>Módulo de ventas (POS)</h1>
        <p style={{
          color: '#9ca3af',
          marginTop: '0.25rem',
          marginBottom: '2rem',
        }}>Selecciona productos para registrar ventas</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flex: 1 }}>
        {/* Catálogo de productos */}
        <div style={{ flex: 1 }}>
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="search"
          />
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '1rem',
            marginTop: '1rem'
          }}>
            {filteredItems.map(product => (
              <Card 
                key={product.id} 
                className="hover:shadow-md cursor-pointer"
                onClick={() => addToCart(product)}
              >
                <div style={{ padding: '1rem' }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#37352f',
                    margin: '0 0 0.5rem 0',
                  }}>{product.name}</h3>
                  <p style={{
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                    margin: 0,
                  }}>${product.unitPrice.toFixed(2)}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Carrito de compras */}
        <div style={{ width: '400px' }}>
          <Card variant="elevated">
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{
                fontWeight: '600',
                fontSize: '1.125rem',
                color: '#37352f',
                marginBottom: '1rem',
                margin: 0,
              }}>Carrito</h2>

              {/* Items del carrito */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginBottom: '1rem',
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {isEmpty ? (
                  <p style={{ 
                    textAlign: 'center', 
                    color: '#9ca3af', 
                    padding: '2rem 0' 
                  }}>El carrito está vacío</p>
                ) : (
                  items.map((item, idx) => (
                    <div key={item.productId} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      borderBottom: '1px solid #e5e5e5'
                    }}>
                      <div>
                        <p style={{ 
                          fontWeight: '500', 
                          margin: '0 0 0.25rem 0',
                          fontSize: '0.875rem'
                        }}>{item.productName}</p>
                        <p style={{ 
                          color: '#9ca3af', 
                          fontSize: '0.75rem',
                          margin: 0
                        }}>${item.unitPrice.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: '600' }}>
                          ${(item.quantity * item.unitPrice).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            borderRadius: '0.25rem',
                            transition: 'color 0.2s'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#991b1b')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#ef4444')}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total y acciones */}
              <div style={{ borderTop: '2px solid #e5e5e5', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: '600' }}>Total:</span>
                  <span style={{ fontWeight: '600', fontSize: '1.25rem' }}>
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
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
                      style={{
                        width: '80px',
                        padding: '0.5rem',
                        border: '1px solid #e5e5e5',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem'
                      }}
                    />
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button onClick={clearCart} variant="secondary" size="sm">
                    Vaciar
                  </Button>
                  <Button onClick={() => {}} variant="primary" size="sm">
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
        <div style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          background: '#16a34a',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          zIndex: 50
        }}>
          ✓ Producto agregado al carrito
        </div>
      )}
    </div>
  );
}
