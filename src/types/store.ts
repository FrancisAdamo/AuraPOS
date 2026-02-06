export interface Store {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreStock {
  id: string;
  productId: string;
  storeId: string;
  quantity: number;
  lastUpdated: Date;
  minStock: number;
  maxStock: number;
}

export interface StoreContext {
  currentStore: Store | null;
  stores: Store[];
  setStore: (storeId: string) => void;
  getConsolidatedStock: (productId: string) => number;
  getStoreStock: (productId: string, storeId: string) => number;
}
