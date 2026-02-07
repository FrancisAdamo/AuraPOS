import { forwardRef } from 'react';
import type { InputHTMLAttributes, Ref } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'search';
  required?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  ref?: Ref<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
  label,
  error,
  helperText,
  size = 'md',
  variant = 'default',
  required = false,
  className = '',
  inputRef,
  ...props
}: InputProps, ref) {
  const { ref: propsRef, ...inputProps } = props;

  const baseClasses = 'border border-notion-border rounded-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-notion-blue focus:border-transparent';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const variantClasses = {
    default: 'bg-notion-background border-notion-border',
    search: 'bg-notion-background pl-10',
  };

  const stateClasses = error 
    ? 'border-red-500 focus:ring-red-500' 
    : 'focus:ring-notion-blue focus:border-transparent';

  const classes = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${stateClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-notion-primary mb-2">
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="requerido">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={(node) => {
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;

            if (typeof inputRef === 'function') inputRef(node);
            else if (inputRef) (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;

            if (typeof propsRef === 'function') propsRef(node);
            else if (propsRef) (propsRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }}
          className={classes}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id || 'input'}-error` : helperText ? `${props.id || 'input'}-helper` : undefined}
          aria-required={required}
          {...inputProps}
        />
        
        {variant === 'search' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-notion-secondary pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 0 11 14" />
              <path d="M11 4a4 4 0 11-8 0 0 11 8" />
            </svg>
          </div>
        )}
      </div>
      
      {error && (
        <div 
          id={`${props.id || 'input'}-error`}
          className="text-red-500 text-sm mt-1"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div 
          id={`${props.id || 'input'}-helper`}
          className="text-notion-secondary text-sm mt-1"
        >
          {helperText}
        </div>
      )}
    </div>
  );
});

export default Input;
