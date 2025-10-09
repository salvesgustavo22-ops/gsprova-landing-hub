import { useEffect, useState } from 'react';

/**
 * Hook for monitoring Core Web Vitals
 */
export const useWebVitals = () => {
  const [vitals, setVitals] = useState<{
    lcp: number | null;
    fid: number | null;
    cls: number | null;
    ttfb: number | null;
  }>({
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  });

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || !window.performance) return;

    // Measure TTFB (Time to First Byte)
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      setVitals(prev => ({ ...prev, ttfb }));
    }

    // Measure LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        setVitals(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });

      try {
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // LCP not supported
      }

      // Measure FID (First Input Delay)
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          setVitals(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
        });
      });

      try {
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        // FID not supported
      }

      // Measure CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setVitals(prev => ({ ...prev, cls: clsValue }));
          }
        });
      });

      try {
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // CLS not supported
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return vitals;
};

/**
 * Hook for monitoring page load performance
 */
export const usePageLoadPerformance = () => {
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        setLoadTime(loadTime);
      }
      setIsLoaded(true);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return { loadTime, isLoaded };
};

/**
 * Hook for performance budget monitoring
 */
export const usePerformanceBudget = () => {
  const [budgetStatus, setBudgetStatus] = useState<{
    jsBudget: { used: number; limit: number; exceeded: boolean };
    cssBudget: { used: number; limit: number; exceeded: boolean };
    imageBudget: { used: number; limit: number; exceeded: boolean };
  } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.performance) return;

    const checkBudget = () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      let jsSize = 0;
      let cssSize = 0;
      let imageSize = 0;

      resources.forEach(resource => {
        const size = resource.transferSize || 0;

        if (resource.name.includes('.js') || resource.initiatorType === 'script') {
          jsSize += size;
        } else if (resource.name.includes('.css') || resource.initiatorType === 'css') {
          cssSize += size;
        } else if (
          resource.initiatorType === 'img' ||
          /\.(jpg|jpeg|png|gif|webp|svg)/.test(resource.name)
        ) {
          imageSize += size;
        }
      });

      // Budget limits (in bytes)
      const budgets = {
        js: 180 * 1024, // 180 KB
        css: 50 * 1024, // 50 KB
        images: 500 * 1024, // 500 KB
      };

      setBudgetStatus({
        jsBudget: {
          used: jsSize,
          limit: budgets.js,
          exceeded: jsSize > budgets.js,
        },
        cssBudget: {
          used: cssSize,
          limit: budgets.css,
          exceeded: cssSize > budgets.css,
        },
        imageBudget: {
          used: imageSize,
          limit: budgets.images,
          exceeded: imageSize > budgets.images,
        },
      });

      // Log warnings for exceeded budgets
      if (jsSize > budgets.js) {
        console.warn(
          `⚠️ JS Budget exceeded: ${(jsSize / 1024).toFixed(2)}KB used, ${budgets.js / 1024}KB limit`
        );
      }
      if (cssSize > budgets.css) {
        console.warn(
          `⚠️ CSS Budget exceeded: ${(cssSize / 1024).toFixed(2)}KB used, ${budgets.css / 1024}KB limit`
        );
      }
      if (imageSize > budgets.images) {
        console.warn(
          `⚠️ Image Budget exceeded: ${(imageSize / 1024).toFixed(2)}KB used, ${budgets.images / 1024}KB limit`
        );
      }
    };

    // Check budget after page load
    if (document.readyState === 'complete') {
      setTimeout(checkBudget, 1000);
    } else {
      window.addEventListener('load', () => setTimeout(checkBudget, 1000));
    }
  }, []);

  return budgetStatus;
};
