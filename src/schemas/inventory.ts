import { z } from 'zod';

// Esquema de validación para productos del inventario
export const productSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .regex(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ()-]+$/, 'El nombre solo puede contener letras, números y caracteres básicos'),
  
  sku: z
    .string()
    .min(3, 'El SKU debe tener al menos 3 caracteres')
    .max(20, 'El SKU no puede exceder 20 caracteres')
    .regex(/^[A-Z0-9-]+$/, 'El SKU solo puede contener letras mayúsculas, números y guiones'),
  
  provider: z
    .string()
    .min(2, 'El proveedor debe tener al menos 2 caracteres')
    .max(50, 'El proveedor no puede exceder 50 caracteres'),
  
  stock: z
    .coerce
    .number({ message: 'El stock debe ser un número entero positivo' })
    .int('El stock debe ser un número entero positivo')
    .min(0, 'El stock no puede ser negativo')
    .max(99999, 'El stock no puede exceder 99999 unidades'),
  
  barcode: z
    .string()
    .max(20, 'El código de barras no puede exceder 20 caracteres')
    .regex(/^\d*$/, 'El código de barras solo puede contener números')
    .optional(),
  
  size: z
    .string()
    .max(20, 'El tamaño no puede exceder 20 caracteres')
    .optional(),
  
  flavor: z
    .string()
    .max(30, 'El sabor no puede exceder 30 caracteres')
    .optional(),
  
  brand: z
    .string()
    .max(50, 'La marca no puede exceder 50 caracteres')
    .optional(),
  
  line: z
    .string()
    .max(50, 'La línea no puede exceder 50 caracteres')
    .optional(),
  
  format: z
    .union([
      z.enum(['Polvo', 'Líquido', 'Cápsulas', 'Tabletas', 'Barritas']),
      z.literal(''),
    ])
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  
  weight: z
    .string()
    .regex(/^\d+(\.\d{1,2})?\s*(g|kg|mg|ml|l)$/, 'Peso inválido. Ej: 500g, 1.5kg, 250ml')
    .optional(),
  
  commercialName: z
    .string()
    .max(100, 'El nombre comercial no puede exceder 100 caracteres')
    .optional(),
  
  organic: z.boolean().default(false),
  glutenFree: z.boolean().default(false),
  vegan: z.boolean().default(false),
});

// Esquema para filtros de inventario
export const inventoryFilterSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  flavor: z.string().optional(),
  format: z.string().optional(),
  organic: z.boolean().optional(),
  glutenFree: z.boolean().optional(),
  vegan: z.boolean().optional(),
  minStock: z.number().min(0).optional(),
  maxStock: z.number().min(0).optional(),
}).refine(
  (data) => {
    if (data.minStock !== undefined && data.maxStock !== undefined) {
      return data.minStock <= data.maxStock;
    }
    return true;
  },
  {
    message: 'El stock mínimo no puede ser mayor al stock máximo',
    path: ['minStock']
  }
);

// Esquema para búsqueda de productos
export const productSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  inStock: z.boolean().optional(),
});

// Tipos inferidos de los esquemas
export type ProductFormData = z.infer<typeof productSchema>;
export type InventoryFilter = z.infer<typeof inventoryFilterSchema>;
export type ProductSearch = z.infer<typeof productSearchSchema>;
