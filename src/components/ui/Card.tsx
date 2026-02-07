import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md' 
}: CardProps) {
  const baseClasses = 'notion-card rounded-lg transition-all duration-200';
  
  const variantClasses = {
  default: 'bg-notion-background border-notion-border',
  bordered: 'bg-notion-background border-2 border-notion-border',
  elevated: 'bg-notion-background border-notion-border shadow-md',
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <article 
      className={classes}
      role="article"
    >
      {children}
    </article>
  );
}
