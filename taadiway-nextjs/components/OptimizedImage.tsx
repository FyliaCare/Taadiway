/**
 * Optimized Image component with lazy loading and blur placeholder
 */

import React, { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  className?: string;
  style?: React.CSSProperties;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoadingComplete?: () => void;
}

/**
 * Generates a simple blur placeholder
 */
function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    // Server-side fallback
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=';
  }
  
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = '#eeeeee';
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL();
}

/**
 * Optimized Image Component
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality = 85,
  className,
  style,
  objectFit = 'cover',
  sizes,
  placeholder = 'blur',
  blurDataURL,
  onLoadingComplete,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    onLoadingComplete?.();
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  // Default blur placeholder
  const defaultBlurDataURL = blurDataURL || generateBlurDataURL();

  // Error fallback
  if (error) {
    return (
      <div
        className={className}
        style={{
          ...style,
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
        }}
      >
        Image unavailable
      </div>
    );
  }

  const imageProps: any = {
    src,
    alt,
    quality,
    priority,
    className,
    style: {
      ...style,
      objectFit,
      transition: 'opacity 0.3s ease-in-out',
      opacity: isLoading ? 0.5 : 1,
    },
    onLoad: handleLoadingComplete,
    onError: handleError,
  };

  // Add blur placeholder
  if (placeholder === 'blur' && !priority) {
    imageProps.placeholder = 'blur';
    imageProps.blurDataURL = defaultBlurDataURL;
  }

  // Add sizes for responsive images
  if (sizes) {
    imageProps.sizes = sizes;
  }

  // Fill or fixed dimensions
  if (fill) {
    imageProps.fill = true;
  } else {
    imageProps.width = width;
    imageProps.height = height;
  }

  return <Image {...imageProps} />;
}

/**
 * Helper function to generate responsive sizes string
 */
export function generateSizes(breakpoints: { size: string; width: string }[]): string {
  return breakpoints.map(bp => `${bp.size} ${bp.width}`).join(', ');
}

/**
 * Common size configurations
 */
export const imageSizes = {
  hero: generateSizes([
    { size: '(max-width: 640px)', width: '100vw' },
    { size: '(max-width: 1024px)', width: '90vw' },
    { size: '', width: '1200px' },
  ]),
  card: generateSizes([
    { size: '(max-width: 640px)', width: '100vw' },
    { size: '(max-width: 1024px)', width: '50vw' },
    { size: '', width: '400px' },
  ]),
  thumbnail: generateSizes([
    { size: '(max-width: 640px)', width: '50vw' },
    { size: '', width: '200px' },
  ]),
  avatar: generateSizes([
    { size: '', width: '128px' },
  ]),
};
