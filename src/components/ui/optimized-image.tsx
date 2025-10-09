import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getOptimizedImageProps, type OptimizedImageProps } from '@/utils/image-optimization';

interface OptimizedImageComponentProps extends OptimizedImageProps {
  onLoad?: () => void;
  onError?: () => void;
  fallback?: string;
}

/**
 * Performance-optimized image component with lazy loading and WebP support
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className,
  onLoad,
  onError,
  fallback,
}: OptimizedImageComponentProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const imageProps = getOptimizedImageProps({
    src,
    alt,
    width,
    height,
    priority,
    sizes,
    className,
  });

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError && fallback) {
    return (
      <img
        {...imageProps}
        src={fallback}
        alt={alt}
        className={cn(imageProps.className, 'opacity-75')}
      />
    );
  }

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && (
        <div
          className={cn(
            'absolute inset-0 animate-pulse bg-muted',
            'flex items-center justify-center text-muted-foreground'
          )}
          style={{ width, height }}
          aria-label="Loading image"
        >
          <div className="size-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </div>
      )}

      <img
        {...imageProps}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          imageProps.className,
          isLoaded ? 'opacity-100' : 'opacity-0',
          'transition-opacity duration-300'
        )}
        style={{
          aspectRatio: `${width} / ${height}`,
        }}
      />
    </div>
  );
};
