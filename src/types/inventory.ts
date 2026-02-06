export interface ProductFormData {
  name: string;
  sku: string;
  provider: string;
  stock: string;
  barcode: string;
  size: string;
  flavor: string;
  brand: string;
  line: string;
  format: string;
  weight: string;
  commercialName: string;
  organic: boolean;
  glutenFree: boolean;
  vegan: boolean;
}

export interface InventoryFilter {
  category?: string;
  brand?: string;
  flavor?: string;
  format?: string;
  organic?: boolean;
  glutenFree?: boolean;
  vegan?: boolean;
  minStock?: number;
  maxStock?: number;
}

export interface InventorySearchResult {
  product: ProductFormData;
  relevance: number;
  matchedFields: string[];
}
