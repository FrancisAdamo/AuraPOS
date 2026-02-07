import { useState, useCallback } from 'react';
import type { ProductSaleItem, ProductIdentifier, MonetaryAmount } from '../types/products';
import { ProductSaleItemSchema } from '../schemas/products';

interface UseCartOptions {
  onItemAdd?: (item: ProductSaleItem) => void;
  onItemRemove?: (productId: ProductIdentifier) => void;
  onCartClear?: () => void;
}

export function useCart(options: UseCartOptions = {}) {
  const [items, setItems] = useState<ProductSaleItem[]>([]);
  
  const addItem = useCallback((product: ProductSaleItem) => {
    // Validar el item con Zod antes de agregarlo
    const validationResult = ProductSaleItemSchema.safeParse(product);
    if (!validationResult.success) {
      console.error('Error de validación en item del carrito:', validationResult.error);
      return;
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.productId);
      
      if (existingItem) {
        // Incrementar cantidad si ya existe
        return prevItems.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * product.unitPrice }
            : item
        );
      } else {
        // Agregar nuevo item
        const newItem: ProductSaleItem = {
          productId: product.productId,
          productName: product.productName,
          unitPrice: product.unitPrice,
          quantity: 1,
          subtotal: product.unitPrice,
        };
        return [...prevItems, newItem];
      }
    });
    
    options.onItemAdd?.(product);
  }, [options.onItemAdd]);
  
  const removeItem = useCallback((productId: ProductIdentifier) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId));
    options.onItemRemove?.(productId);
  }, [options.onItemRemove]);
  
  const updateQuantity = useCallback((productId: ProductIdentifier, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity, subtotal: quantity * item.unitPrice }
          : item
      )
    );
  }, [removeItem, options.onItemRemove]);
  
  const clearCart = useCallback(() => {
    setItems([]);
    options.onCartClear?.();
  }, [options.onCartClear]);
  
  const total = items.reduce((sum: MonetaryAmount, item) => sum + item.subtotal, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    isEmpty: items.length === 0,
  };
}
