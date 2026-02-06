import { AlertCircle, CheckCircle } from 'lucide-react';
import { useProductForm } from '../../hooks/useProductForm';
import type { ProductFormData } from '../../schemas/inventory';
import { Button, Input } from '../ui';

interface ProductFormProps {
  defaultValues?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ProductForm({ defaultValues, onSubmit, onCancel, isLoading = false }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    isSubmitting,
    submitError,
    getFieldError,
    hasFieldError,
    setFieldValue,
    watch
  } = useProductForm({ defaultValues, onSubmit });

  const watchedValues = watch();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información Básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-notion-primary mb-2">
            Nombre del Producto *
          </label>
          <Input
            {...register('name')}
            placeholder="Ej: Proteína Whey Vainilla"
            className={hasFieldError('name') ? 'border-red-500' : ''}
          />
          {hasFieldError('name') && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {getFieldError('name')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-notion-primary mb-2">
            SKU *
          </label>
          <Input
            {...register('sku')}
            placeholder="Ej: PROTEIN-WHEY-VAN-1KG"
            className={hasFieldError('sku') ? 'border-red-500' : ''}
          />
          {hasFieldError('sku') && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {getFieldError('sku')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-notion-primary mb-2">
            Proveedor *
          </label>
          <Input
            {...register('provider')}
            placeholder="Ej: NutriFit Pro"
            className={hasFieldError('provider') ? 'border-red-500' : ''}
          />
          {hasFieldError('provider') && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {getFieldError('provider')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-notion-primary mb-2">
            Stock *
          </label>
          <Input
            {...register('stock')}
            type="number"
            placeholder="0"
            className={hasFieldError('stock') ? 'border-red-500' : ''}
          />
          {hasFieldError('stock') && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {getFieldError('stock')}
            </p>
          )}
        </div>
      </div>

      {/* Detalles Adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-notion-primary mb-2">
            Código de Barras
          </label>
          <Input
            {...register('barcode')}
            placeholder="Ej: 1234567890123"
            className={hasFieldError('barcode') ? 'border-red-500' : ''}
          />
          {hasFieldError('barcode') && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {getFieldError('barcode')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-notion-primary mb-2">
            Marca
          </label>
          <Input
            {...register('brand')}
            placeholder="Ej: NutriFit Pro"
            className={hasFieldError('brand') ? 'border-red-500' : ''}
          />
          {hasFieldError('brand') && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {getFieldError('brand')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-notion-primary mb-2">
            Sabor
          </label>
          <Input
            {...register('flavor')}
            placeholder="Ej: Vainilla"
            className={hasFieldError('flavor') ? 'border-red-500' : ''}
          />
          {hasFieldError('flavor') && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {getFieldError('flavor')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-notion-primary mb-2">
            Formato
          </label>
          <select
            {...register('format')}
            className={`w-full px-3 py-2 border border-notion-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              hasFieldError('format') ? 'border-red-500' : ''
            }`}
          >
            <option value="">Seleccionar formato</option>
            <option value="Polvo">Polvo</option>
            <option value="Líquido">Líquido</option>
            <option value="Cápsulas">Cápsulas</option>
            <option value="Tabletas">Tabletas</option>
            <option value="Barritas">Barritas</option>
          </select>
          {hasFieldError('format') && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {getFieldError('format')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-notion-primary mb-2">
            Tamaño
          </label>
          <Input
            {...register('size')}
            placeholder="Ej: 1kg"
            className={hasFieldError('size') ? 'border-red-500' : ''}
          />
          {hasFieldError('size') && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {getFieldError('size')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-notion-primary mb-2">
            Peso
          </label>
          <Input
            {...register('weight')}
            placeholder="Ej: 1000g"
            className={hasFieldError('weight') ? 'border-red-500' : ''}
          />
          {hasFieldError('weight') && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {getFieldError('weight')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-notion-primary mb-2">
            Nombre Comercial
          </label>
          <Input
            {...register('commercialName')}
            placeholder="Ej: Ultra Whey Protein Premium"
            className={hasFieldError('commercialName') ? 'border-red-500' : ''}
          />
          {hasFieldError('commercialName') && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {getFieldError('commercialName')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-notion-primary mb-2">
            Línea
          </label>
          <Input
            {...register('line')}
            placeholder="Ej: Premium"
            className={hasFieldError('line') ? 'border-red-500' : ''}
          />
          {hasFieldError('line') && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {getFieldError('line')}
            </p>
          )}
        </div>
      </div>

      {/* Flags Especiales */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-notion-primary">Atributos Especiales</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center gap-3 p-3 border border-notion-border rounded-lg hover:bg-notion-hover cursor-pointer">
            <input
              {...register('organic')}
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-notion-border rounded focus:ring-blue-500"
            />
            <div>
              <div className="font-medium text-notion-primary">Orgánico</div>
              <div className="text-sm text-notion-secondary">Producto certificado orgánico</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border border-notion-border rounded-lg hover:bg-notion-hover cursor-pointer">
            <input
              {...register('glutenFree')}
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-notion-border rounded focus:ring-blue-500"
            />
            <div>
              <div className="font-medium text-notion-primary">Sin TACC</div>
              <div className="text-sm text-notion-secondary">Libre de gluten</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border border-notion-border rounded-lg hover:bg-notion-hover cursor-pointer">
            <input
              {...register('vegan')}
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-notion-border rounded focus:ring-blue-500"
            />
            <div>
              <div className="font-medium text-notion-primary">Vegano</div>
              <div className="text-sm text-notion-secondary">Sin ingredientes de origen animal</div>
            </div>
          </label>
        </div>
      </div>

      {/* Error General */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 flex items-center gap-2">
            <AlertCircle size={16} />
            {submitError}
          </p>
        </div>
      )}

      {/* Botones de Acción */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t border-notion-border">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          variant="outline"
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          disabled={!isValid || isSubmitting || isLoading}
          className="flex items-center gap-2"
        >
          {isSubmitting || isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <CheckCircle size={16} />
              Guardar Producto
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
