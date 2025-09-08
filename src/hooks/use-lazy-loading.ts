import { useEffect, useRef, useState } from 'react';

/**
 * Hook for implementing lazy loading with Intersection Observer
 */
export const useLazyLoading = (
  threshold = 0.1,
  rootMargin = '50px 0px'
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || hasLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          setHasLoaded(true);
          observer.unobserve(target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [threshold, rootMargin, hasLoaded]);

  return {
    targetRef,
    isIntersecting: isIntersecting || hasLoaded,
    hasLoaded,
  };
};

/**
 * Hook for preloading images when they're about to enter viewport
 */
export const useImagePreloader = (
  imageSources: string[],
  threshold = 0.5
) => {
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const { targetRef, isIntersecting } = useLazyLoading(threshold, '200px 0px');

  useEffect(() => {
    if (!isIntersecting) return;

    const preloadPromises = imageSources.map(src => {
      if (preloadedImages.has(src)) return Promise.resolve();
      
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, src]));
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.allSettled(preloadPromises);
  }, [isIntersecting, imageSources, preloadedImages]);

  return { targetRef, preloadedImages };
};