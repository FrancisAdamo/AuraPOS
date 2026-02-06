import { useState, useEffect, useCallback } from 'react';
import type { Store, StoreStock, StoreContext } from '../types/store';

// Mock data para demostración
const MOCK_STORES: Store[] = [
  {
    id: 'store-1',
    name: 'Sucursal Central',
    address: 'Av. Principal 123, Ciudad',
    phone: '+54 11 1234-5678',
    email: 'central@aurapos.com',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: 'store-2',
    name: 'Sucursal Norte',
    address: 'Av. Norte 456, Ciudad',
    phone: '+54 11 8765-4321',
    email: 'norte@aurapos.com',
    isActive: true,
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date(),
  },
];

const MOCK_STORE_STOCK: StoreStock[] = [
  { id: 'ss-1', productId: 'SKU001', storeId: 'store-1', quantity: 50, lastUpdated: new Date(), minStock: 10, maxStock: 100 },
  { id: 'ss-2', productId: 'SKU001', storeId: 'store-2', quantity: 30, lastUpdated: new Date(), minStock: 10, maxStock: 100 },
  { id: 'ss-3', productId: 'SKU002', storeId: 'store-1', quantity: 25, lastUpdated: new Date(), minStock: 5, maxStock: 50 },
  { id: 'ss-4', productId: 'SKU002', storeId: 'store-2', quantity: 15, lastUpdated: new Date(), minStock: 5, maxStock: 50 },
];

export function useStore(): StoreContext {
  const [currentStore, setCurrentStore] = useState<Store | null>(MOCK_STORES[0]);
  const [stores] = useState<Store[]>(MOCK_STORES);

  const setStore = useCallback((storeId: string) => {
    const store = stores.find(s => s.id === storeId);
    if (store) {
      setCurrentStore(store);
      localStorage.setItem('aurapos_current_store', storeId);
    }
  }, [stores]);

  const getConsolidatedStock = useCallback((productId: string): number => {
    return MOCK_STORE_STOCK
      .filter(stock => stock.productId === productId)
      .reduce((total, stock) => total + stock.quantity, 0);
  }, []);

  const getStoreStock = useCallback((productId: string, storeId: string): number => {
    const stock = MOCK_STORE_STOCK.find(
      s => s.productId === productId && s.storeId === storeId
    );
    return stock?.quantity || 0;
  }, []);

  useEffect(() => {
    const savedStoreId = localStorage.getItem('aurapos_current_store');
    if (savedStoreId) {
      setStore(savedStoreId);
    }
  }, [setStore]);

  return {
    currentStore,
    stores,
    setStore,
    getConsolidatedStock,
    getStoreStock,
  };
}
