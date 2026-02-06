import { Command } from 'cmdk';
import { Search, Package, Barcode, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ProductFormData } from '../../types/inventory';

interface InventoryCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ProductFormData) => void;
  products: ProductFormData[];
}

export function InventoryCommandPalette({ isOpen, onClose, onSelectProduct, products }: InventoryCommandPaletteProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.flavor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-[20vh]">
      <Command className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl border border-notion-border">
        <div className="flex items-center border-b border-notion-border px-4">
          <Search className="mr-3 h-4 w-4 text-notion-secondary" />
          <Command.Input
            placeholder="Buscar productos por nombre, SKU, código de barras, marca, sabor..."
            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-notion-secondary"
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
        </div>
        
        <Command.List className="max-h-[450px] overflow-y-auto p-2">
          {filteredProducts.length === 0 ? (
            <div className="py-6 text-center text-sm text-notion-secondary">
              No se encontraron productos.
            </div>
          ) : (
            <Command.Group heading="Resultados de búsqueda">
              {filteredProducts.map((product) => (
                <Command.Item
                  key={product.sku}
                  onSelect={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-notion-hover aria-selected:bg-notion-hover"
                >
                  <Package className="h-4 w-4 text-notion-secondary" />
                  <div className="flex-1">
                    <div className="font-medium text-notion-primary">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-notion-secondary">
                      <span>SKU: {product.sku}</span>
                      <span>Marca: {product.brand}</span>
                      <span>Sabor: {product.flavor}</span>
                      <span>Stock: {product.stock}</span>
                    </div>
                  </div>
                  {product.barcode && (
                    <div className="flex items-center gap-1 text-xs text-notion-secondary">
                      <Barcode className="h-3 w-3" />
                      {product.barcode}
                    </div>
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          )}
        </Command.List>
        
        <div className="border-t border-notion-border px-4 py-2">
          <div className="flex items-center gap-2 text-xs text-notion-secondary">
            <Filter className="h-3 w-3" />
            <span>Usa atajos: ↑↓ para navegar, Enter para seleccionar, ESC para cerrar</span>
          </div>
        </div>
      </Command>
    </div>
  );
}
