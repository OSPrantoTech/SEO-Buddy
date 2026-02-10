/**
 * ============================================
 * BUTTON COMPONENT
 * ============================================
 * A reusable button with different styles.
 * 
 * FOR BEGINNERS:
 * - Variants: 'primary' (main action), 'secondary' (less important), 'ghost' (minimal)
 * - Sizes: 'sm', 'md', 'lg'
 * - Use 'loading' prop to show a spinner when processing
 */

import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  // Base styles that all buttons share
  const baseStyles = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // Different visual styles for each variant
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-indigo-600 to-purple-600
      hover:from-indigo-700 hover:to-purple-700
      text-white shadow-lg shadow-indigo-500/25
      focus:ring-indigo-500
    `,
    secondary: `
      bg-gray-100 dark:bg-gray-700
      hover:bg-gray-200 dark:hover:bg-gray-600
      text-gray-900 dark:text-gray-100
      focus:ring-gray-500
    `,
    ghost: `
      bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
      text-gray-700 dark:text-gray-300
      focus:ring-gray-500
    `,
    danger: `
      bg-red-600 hover:bg-red-700
      text-white shadow-lg shadow-red-500/25
      focus:ring-red-500
    `,
  };

  // Different sizes
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {/* Show spinner when loading */}
      {loading && (
        <svg 
          className="animate-spin h-4 w-4" 
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle 
            className="opacity-25" 
            cx="12" cy="12" r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
