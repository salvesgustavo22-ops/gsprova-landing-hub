/**
 * Image optimization utilities for performance
 */

/**
 * Generate responsive image srcSet with WebP/AVIF support
 */
export const generateSrcSet = (basePath: string, sizes: number[] = [400, 800, 1200]) => {
  return sizes
    .map(size => `${basePath}?w=${size}&format=webp ${size}w`)
    .join(', ');
};

/**
 * Lazy loading intersection observer
 */
export const createLazyImageObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  if (typeof window === 'undefined') return null;
  
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );

  return observer;
};

/**
 * Performance-optimized image component props
 */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Get optimized image attributes based on priority and viewport
 */
export const getOptimizedImageProps = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
}: OptimizedImageProps) => {
  return {
    src,
    alt,
    width,
    height,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    fetchPriority: priority ? ('high' as const) : ('low' as const),
    sizes,
    className: `${className} transition-opacity duration-300`,
    decoding: 'async' as const,
  };
};

/**
 * Preload critical images for LCP optimization
 */
export const preloadImage = (src: string, priority: 'high' | 'low' = 'high') => {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.fetchPriority = priority;
  
  document.head.appendChild(link);
};

/**
 * Performance budget checker
 */
export const checkPerformanceBudget = () => {
  if (typeof window === 'undefined' || !('performance' in window)) return;
  
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    
    // Performance thresholds
    const THRESHOLDS = {
      LCP: 2500, // Largest Contentful Paint
      FID: 100,  // First Input Delay
      CLS: 0.1,  // Cumulative Layout Shift
      TTFB: 800, // Time to First Byte
    };
    
    // Log warnings if thresholds are exceeded
    if (loadTime > THRESHOLDS.LCP) {
      console.warn(`⚠️ Performance: Load time (${loadTime}ms) exceeds LCP threshold (${THRESHOLDS.LCP}ms)`);
    }
    
    // Monitor TTFB
    const ttfb = navigation.responseStart - navigation.requestStart;
    if (ttfb > THRESHOLDS.TTFB) {
      console.warn(`⚠️ Performance: TTFB (${ttfb}ms) exceeds threshold (${THRESHOLDS.TTFB}ms)`);
    }
  });
};