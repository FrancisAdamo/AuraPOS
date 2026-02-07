// Tipos semánticos de negocio para productos
export type ProductIdentifier = string; // SKU único
export type ProductName = string;
export type MonetaryAmount = number;
export type SaleQuantity = number;
export type StockQuantity = number;

export const ProductCategory = {
  PROTEIN: 'Proteínas',
  SUPPLEMENTS: 'Suplementos',
  AMINO_ACIDS: 'Aminoácidos',
  VITAMINS: 'Vitaminas',
  SNACKS: 'Snacks',
  COLLAGEN: 'Colágeno',
} as const;

export type ProductCategory = typeof ProductCategory[keyof typeof ProductCategory];

export const StockStatus = {
  CRITICAL: 'red',    // <= 5 unidades
  LOW: 'yellow',      // 6-15 unidades  
  NORMAL: 'green',    // > 15 unidades
} as const;

export type StockStatus = typeof StockStatus[keyof typeof StockStatus];

export const StockUnit = {
  GRAMS: 'g',
  UNITS: 'unidades',
  MILLILITERS: 'ml',
} as const;

export type StockUnit = typeof StockUnit[keyof typeof StockUnit];

export interface Product {
  id: number;
  sku: ProductIdentifier;
  name: ProductName;
  category: ProductCategory;
  unitPrice: MonetaryAmount;
  stockUnit: StockUnit;
  packageSize: number;
  provider: string;
  currentStock: StockQuantity;
  status: StockStatus;
  barcode: string; // Código de barras numérico
}

export interface ProductSaleItem {
  productId: ProductIdentifier;
  productName: ProductName;
  unitPrice: MonetaryAmount;
  quantity: SaleQuantity;
  subtotal: MonetaryAmount;
  barcode: string;
}

export interface InventoryItem {
  id: number;
  sku: ProductIdentifier;
  name: ProductName;
  provider: string;
  stock: StockQuantity;
  status: StockStatus;
}

// Tipos para operaciones de caja
export interface SalesData {
  totalBruto: MonetaryAmount;
  cash: MonetaryAmount;
  card: MonetaryAmount;
  transfer: MonetaryAmount;
}

export interface CashClosureRecord {
  id: string;
  date: string;
  totalBruto: MonetaryAmount;
  cash: MonetaryAmount;
  card: MonetaryAmount;
  transfer: MonetaryAmount;
  countedCash: MonetaryAmount;
  discrepancy: MonetaryAmount;
  discrepancyNote: string;
  withdrawals: Array<{
    date: string;
    amount: MonetaryAmount;
    reason: string;
  }>;
}
