import { Search, Plus, Trash2, CheckCircle, Percent } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function POSModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [showDiscountInput, setShowDiscountInput] = useState(false);

  const products = [
    { id: 1, name: 'Proteína Whey Vainilla', price: 45.99, category: 'Proteínas' },
    { id: 2, name: 'Proteína Whey Chocolate', price: 45.99, category: 'Proteínas' },
    { id: 3, name: 'Creatina Monohidrato', price: 28.50, category: 'Suplementos' },
    { id: 4, name: 'BCAA Limón', price: 35.99, category: 'Aminoácidos' },
    { id: 5, name: 'Multivitamínico Diario', price: 22.99, category: 'Vitaminas' },
    { id: 6, name: 'Barrita Proteica Almendra', price: 3.50, category: 'Snacks' },
    { id: 7, name: 'Omega 3 Premium', price: 32.99, category: 'Suplementos' },
    { id: 8, name: 'Colágeno Hidrolizado', price: 38.50, category: 'Colágeno' },
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (total * discountPercentage) / 100;
  const finalTotal = total - discountAmount;

  const handleFinalizeSale = () => {
    setShowSuccess(true);
    setCart([]);
    setDiscountPercentage(0);
    setShowDiscountInput(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: '0.25rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
          margin: 0,
        }}>Gestiona tus transacciones en tiempo real</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1.5rem',
      }}>
        
        {/* Products Section */}
        <div style={{ gridColumn: '1 / 3', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Search Bar - ALINEADO CORRECTAMENTE */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            border: '1px solid #e5e5e5',
            borderRadius: '0.25rem',
            backgroundColor: '#ffffff',
            transition: 'all 0.2s ease',
          }}>
            <Search size={20} color="#9ca3af" style={{ flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '1rem',
                color: '#37352f',
                backgroundColor: 'transparent',
              }}
            />
          </div>

          {/* Products Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}>
            {filteredProducts.map(product => (
              <div key={product.id} style={{
                ...cardStyle,
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h3 style={{
                    fontWeight: 600,
                    color: '#37352f',
                    margin: 0,
                  }}>{product.name}</h3>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                    marginTop: '0.25rem',
                    margin: 0,
                  }}>{product.category}</p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1rem',
                }}>
                  <p style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: '#2563eb',
                    margin: 0,
                  }}>${product.price.toLocaleString()}</p>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
                  >
                    <Plus size={16} />
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div style={{
          ...cardStyle,
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          height: 'fit-content',
          position: 'sticky',
          top: '2rem',
        }}>
          <h2 style={{
            fontWeight: 600,
            fontSize: '1.125rem',
            color: '#37352f',
            marginBottom: '1rem',
            margin: 0,
          }}>Carrito</h2>

          {/* Cart Items */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginBottom: '1rem',
            maxHeight: '24rem',
            overflowY: 'auto',
          }}>
            {cart.length === 0 ? (
              <p style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                textAlign: 'center',
                paddingTop: '2rem',
                paddingBottom: '2rem',
                margin: 0,
              }}>
                El carrito está vacío
              </p>
            ) : (
              cart.map((item, idx) => (
                <div key={item.id} style={{
                  paddingBottom: '0.75rem',
                  borderBottom: idx === cart.length - 1 ? 'none' : '1px solid #e5e5e5',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                  }}>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#37352f',
                      margin: 0,
                    }}>{item.name}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#ef4444',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#991b1b')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#ef4444')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          border: '1px solid #e5e5e5',
                          borderRadius: '0.25rem',
                          backgroundColor: '#ffffff',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                      >
                        −
                      </button>
                      <span style={{
                        width: '1.5rem',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          border: '1px solid #e5e5e5',
                          borderRadius: '0.25rem',
                          backgroundColor: '#ffffff',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                      >
                        +
                      </button>
                    </div>
                    <p style={{
                      fontWeight: 600,
                      color: '#2563eb',
                      margin: 0,
                    }}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Total */}
          {cart.length > 0 && (
            <>
              <div style={{
                paddingTop: '1rem',
                paddingBottom: '1rem',
                borderTop: '1px solid #e5e5e5',
              }}>
                {/* Subtotal */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  fontSize: '0.875rem',
                }}>
                  <span style={{ color: '#9ca3af' }}>Subtotal:</span>
                  <span style={{ fontWeight: 600, color: '#37352f' }}>
                    ${total.toLocaleString()}
                  </span>
                </div>

                {/* Discount Section */}
                <div style={{
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #e5e5e5',
                }}>
                  {!showDiscountInput ? (
                    <button
                      onClick={() => setShowDiscountInput(true)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#f9fafb',
                        color: '#3b82f6',
                        border: '1px solid #e5e5e5',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f3f4f6';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f9fafb';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e5e5';
                      }}
                    >
                      <Percent size={16} />
                      Agregar Descuento
                    </button>
                  ) : (
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center',
                    }}>
                      <div style={{ flex: 1, position: 'relative' }}>
                        <input
                          type="number"
                          placeholder="0"
                          value={discountPercentage === 0 ? '' : discountPercentage}
                          onChange={(e) => {
                            if (e.target.value === '') {
                              setDiscountPercentage(0);
                            } else {
                              const value = Math.min(Math.max(parseFloat(e.target.value) || 0, 0), 100);
                              setDiscountPercentage(value);
                            }
                          }}
                          autoFocus
                          style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #3b82f6',
                            borderRadius: '0.25rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            textAlign: 'center',
                            outline: 'none',
                          }}
                        />
                        <span style={{
                          position: 'absolute',
                          right: '0.5rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#9ca3af',
                          fontWeight: 600,
                          pointerEvents: 'none',
                        }}>%</span>
                      </div>
                      <button
                        onClick={() => setShowDiscountInput(false)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.25rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
                      >
                        Cerrar
                      </button>
                    </div>
                  )}
                  
                  {discountPercentage > 0 && (
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '0.5rem 0.75rem',
                      backgroundColor: '#fef3c7',
                      border: '1px solid #fcd34d',
                      borderRadius: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#854d0e',
                      }}>Descuento {discountPercentage}%:</span>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#854d0e',
                      }}>
                        -${discountAmount.toLocaleString('es-ES', { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Final Total */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                  <span style={{
                    fontWeight: 600,
                    color: '#37352f',
                    fontSize: '1rem',
                  }}>Total a Pagar:</span>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: discountPercentage > 0 ? '#16a34a' : '#16a34a',
                  }}>
                    ${finalTotal.toLocaleString('es-ES', { maximumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  onClick={handleFinalizeSale}
                  style={{
                    width: '100%',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    fontSize: '0.875rem',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
                >
                  Finalizar Venta
                </button>
              </div>
            </>
          )}

          {/* Success Message */}
          {showSuccess && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#f0fdf4',
              border: '1px solid #dcfce7',
              borderRadius: '0.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
            }}>
              <CheckCircle size={20} color="#16a34a" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
              <div>
                <p style={{
                  fontWeight: 600,
                  color: '#166534',
                  margin: 0,
                }}>¡Venta completada!</p>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#15803d',
                  margin: '0.25rem 0 0 0',
                }}>Stock actualizado correctamente</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
