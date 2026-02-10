/**
 * ============================================
 * TOOLTIP COMPONENT
 * ============================================
 * Shows helpful explanations when users hover over elements.
 * Perfect for explaining SEO terms to beginners!
 * 
 * HOW TO USE:
 * <Tooltip content="This explains what SEO means">
 *   <span>SEO</span>
 * </Tooltip>
 */

import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface TooltipProps {
  content: string;           // The explanation text
  children: React.ReactNode; // The element to hover over
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Position classes for the tooltip
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {/* Tooltip box */}
      <div
        className={cn(
          'absolute z-50 px-3 py-2 text-sm rounded-lg shadow-lg',
          'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900',
          'whitespace-nowrap transition-all duration-200',
          'pointer-events-none',
          positionClasses[position],
          isVisible 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible translate-y-1'
        )}
      >
        {content}
        
        {/* Tooltip arrow */}
        <div 
          className={cn(
            'absolute w-2 h-2 rotate-45',
            'bg-gray-900 dark:bg-gray-100',
            position === 'top' && 'top-full left-1/2 -translate-x-1/2 -mt-1',
            position === 'bottom' && 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
            position === 'left' && 'left-full top-1/2 -translate-y-1/2 -ml-1',
            position === 'right' && 'right-full top-1/2 -translate-y-1/2 -mr-1',
          )}
        />
      </div>
    </div>
  );
}
