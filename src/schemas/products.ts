import { z } from 'zod';
import { ProductCategory, StockStatus, StockUnit } from '../types/products';

// Schema para validación de productos
export const ProductSchema = z.object({
  id: z.number().positive(),
  sku: z.string().min(1, 'SKU es requerido'),
  name: z.string().min(1, 'Nombre es requerido'),
  category: z.nativeEnum(ProductCategory),
  unitPrice: z.number().positive('Precio debe ser mayor a 0'),
  stockUnit: z.nativeEnum(StockUnit),
  packageSize: z.number().positive(),
  provider: z.string().min(1, 'Proveedor es requerido'),
  currentStock: z.number().min(0, 'Stock no puede ser negativo'),
  status: z.nativeEnum(StockStatus),
});

// Schema para items del carrito
export const ProductSaleItemSchema = z.object({
  productId: z.string().min(1, 'ID de producto es requerido'),
  productName: z.string().min(1, 'Nombre es requerido'),
  unitPrice: z.number().positive('Precio debe ser mayor a 0'),
  quantity: z.number().positive('Cantidad debe ser mayor a 0'),
  subtotal: z.number().nonnegative('Subtotal no puede ser negativo'),
}).refine(
  (data) => Math.abs(data.subtotal - (data.unitPrice * data.quantity)) < 0.01,
  {
    message: 'Subtotal debe coincidir con precio unitario × cantidad',
    path: ['subtotal'],
  }
);

// Schema para validación de inventario
export const InventoryItemSchema = z.object({
  id: z.number().positive(),
  sku: z.string().min(1, 'SKU es requerido'),
  name: z.string().min(1, 'Nombre es requerido'),
  provider: z.string().min(1, 'Proveedor es requerido'),
  stock: z.number().min(0, 'Stock no puede ser negativo'),
  status: z.nativeEnum(StockStatus),
});

// Schema para filtros de inventario
export const InventoryFilterSchema = z.object({
  brand: z.string().optional(),
  flavor: z.string().optional(),
  format: z.string().optional(),
  minStock: z.number().min(0).optional(),
  maxStock: z.number().positive().optional(),
  organic: z.boolean().optional(),
  glutenFree: z.boolean().optional(),
  vegan: z.boolean().optional(),
});

// Types inferidos de los schemas
export type ProductInput = z.infer<typeof ProductSchema>;
export type ProductSaleItemInput = z.infer<typeof ProductSaleItemSchema>;
export type InventoryItemInput = z.infer<typeof InventoryItemSchema>;
export type InventoryFilterInput = z.infer<typeof InventoryFilterSchema>;
