import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { ProductFormData } from '../schemas/inventory';
import { productSchema } from '../schemas/inventory';

interface UseProductFormProps {
  defaultValues?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
}

export function useProductForm({ defaultValues, onSubmit }: UseProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
    watch,
    trigger,
    setError,
    clearErrors
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      sku: '',
      provider: '',
      stock: 0,
      barcode: '',
      size: '',
      flavor: '',
      brand: '',
      line: '',
      format: undefined,
      weight: '',
      commercialName: '',
      organic: false,
      glutenFree: false,
      vegan: false,
      ...defaultValues
    },
    mode: 'all'
  });

  const onFormSubmit: SubmitHandler<ProductFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al guardar el producto';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: keyof ProductFormData) => {
    const error = errors[fieldName];
    return error?.message;
  };

  const hasFieldError = (fieldName: keyof ProductFormData) => {
    return !!errors[fieldName];
  };

  const validateField = async (fieldName: keyof ProductFormData) => {
    const result = await trigger(fieldName);
    return result;
  };

  const setFieldValue = (fieldName: keyof ProductFormData, value: any) => {
    setValue(fieldName, value, { shouldValidate: true, shouldDirty: true });
  };

  return {
    // Form control
    register,
    handleSubmit: handleSubmit as any,
    onFormSubmit: onFormSubmit,
    reset,
    setValue: setFieldValue,
    watch,
    trigger,
    setError,
    clearErrors,
    
    // Form state
    errors,
    isValid,
    isDirty,
    isSubmitting,
    submitError,
    
    // Utility methods
    getFieldError,
    hasFieldError,
    validateField,
    setFieldValue
  };
}
