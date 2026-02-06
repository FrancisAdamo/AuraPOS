import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
}

export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-expanded': ariaExpanded,
  ...props
}: ButtonProps) {
  const baseClasses = 'notion-button font-medium inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-notion-blue focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-notion-blue text-white hover:bg-blue-600 focus:ring-notion-blue',
    secondary: 'bg-transparent text-notion-primary border border-notion-border hover:bg-notion-hover focus:ring-notion-primary',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    ghost: 'bg-transparent text-notion-primary hover:bg-notion-hover focus:ring-notion-primary',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
      ) : (
        children
      )}
    </button>
  );
}
