// Performance optimization utilities

// Lazy load components to reduce initial bundle size
export const lazyLoadComponent = (importFunc: () => Promise<any>) => {
  return importFunc;
};

// Resource preloading helper
export const preloadResource = (href: string, as: string, type?: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
  return link;
};

// Critical resource hints
export const addResourceHints = () => {
  // DNS prefetch for external domains
  const domains = [
    'https://www.googletagmanager.com',
    'https://fonts.googleapis.com'
  ];
  
  domains.forEach(domain => {
    const prefetch = document.createElement('link');
    prefetch.rel = 'dns-prefetch';
    prefetch.href = domain;
    document.head.appendChild(prefetch);
    
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = domain;
    preconnect.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect);
  });
};

// Defer heavy JavaScript execution
export const deferExecution = (callback: () => void, delay = 0) => {
  if (typeof window !== 'undefined') {
    if (delay > 0) {
      setTimeout(callback, delay);
    } else {
      // Use requestIdleCallback if available, otherwise use setTimeout
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(callback);
      } else {
        setTimeout(callback, 1);
      }
    }
  }
};