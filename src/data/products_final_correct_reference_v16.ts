import type { Product } from '../types/products';
import { ProductCategory, StockStatus, StockUnit } from '../types/products';

// Catálogo maestro de productos con datos semánticos
export const PRODUCT_CATALOG: readonly Product[] = [
  {
    id: 1,
    sku: 'NW-WHEY-VAN-1KG',
    name: 'Proteína Whey Vainilla',
    category: ProductCategory.PROTEIN,
    unitPrice: 45.99,
    stockUnit: StockUnit.GRAMS,
    packageSize: 1000,
    provider: 'NutriFit Pro',
    currentStock: 45,
    status: StockStatus.NORMAL,
  },
  {
    id: 2,
    sku: 'NW-WHEY-CHOC-1KG',
    name: 'Proteína Whey Chocolate',
    category: ProductCategory.PROTEIN,
    unitPrice: 45.99,
    stockUnit: StockUnit.GRAMS,
    packageSize: 1000,
    provider: 'NutriFit Pro',
    currentStock: 32,
    status: StockStatus.NORMAL,
  },
  {
    id: 3,
    sku: 'NW-CREATINE-300G',
    name: 'Creatina Monohidrato',
    category: ProductCategory.SUPPLEMENTS,
    unitPrice: 28.50,
    stockUnit: StockUnit.GRAMS,
    packageSize: 300,
    provider: 'PowerLabs',
    currentStock: 8,
    status: StockStatus.LOW,
  },
  {
    id: 4,
    sku: 'NW-BCAA-LEMON-250G',
    name: 'BCAA Limón',
    category: ProductCategory.AMINO_ACIDS,
    unitPrice: 35.99,
    stockUnit: StockUnit.GRAMS,
    packageSize: 250,
    provider: 'AminoMax',
    currentStock: 2,
    status: StockStatus.CRITICAL,
  },
  {
    id: 5,
    sku: 'NW-MULTIVITAMIN-60CAPS',
    name: 'Multivitamínico Diario',
    category: ProductCategory.VITAMINS,
    unitPrice: 22.99,
    stockUnit: StockUnit.UNITS,
    packageSize: 60,
    provider: 'VitaHealth',
    currentStock: 18,
    status: StockStatus.NORMAL,
  },
  {
    id: 6,
    sku: 'NW-OMEGA3-120CAPS',
    name: 'Omega 3 Premium',
    category: ProductCategory.SUPPLEMENTS,
    unitPrice: 32.99,
    stockUnit: StockUnit.UNITS,
    packageSize: 120,
    provider: 'MarineLabs',
    currentStock: 12,
    status: StockStatus.NORMAL,
  },
  {
    id: 7,
    sku: 'NW-COLLAGEN-300G',
    name: 'Colágeno Hidrolizado',
    category: ProductCategory.COLLAGEGEN,
    unitPrice: 38.50,
    stockUnit: StockUnit.GRAMS,
    packageSize: 300,
    provider: 'CollagenPro',
    currentStock: 3,
    status: StockStatus.CRITICAL,
  },
  {
    id: 8,
    sku: 'NW-PROTEINBAR-ALMOND-12PK',
    name: 'Barrita Proteica Almendra',
    category: ProductCategory.SNACKS,
    unitPrice: 3.50,
    stockUnit: StockUnit.UNITS,
    packageSize: 12,
    provider: 'ProteinSnacks',
    currentStock: 28,
    status: StockStatus.NORMAL,
  },
] as const;

// Utilidades para cálculos de stock
export const getStockStatus = (stock: number): StockStatus => {
  if (stock <= 0) return StockStatus.CRITICAL;
  if (stock <= 5) return StockStatus.CRITICAL;
  if (stock <= 15) return StockStatus.LOW;
  return StockStatus.NORMAL;
};

// Productos más vendidos (para dashboard)
export const TOP_SELLING_PRODUCTS = [
  {
    name: 'Proteína Whey Vainilla',
    sales: 156,
    revenue: 7161.44,
  },
  {
    name: 'Omega 3 Premium',
    sales: 142,
    revenue: 4680.58,
  },
  {
    name: 'Colágeno Hidrolizado',
    sales: 87,
    revenue: 3349.50,
  },
] as const;

// Items con stock bajo (para alertas)
export const LOW_STOCK_ITEMS = [
  {
    name: 'BCAA Limón 250g',
    sku: 'NW-BCAA-LEMON-250G',
    stock: 2,
  },
  {
    name: 'Colágeno Hidrolizado 300g',
    sku: 'NW-COLLAGEN-300G',
    stock: 3,
  },
  {
    name: 'Creatina Monohidrato 300g',
    sku: 'NW-CREATINE-300G',
    stock: 8,
  },
] as const;
