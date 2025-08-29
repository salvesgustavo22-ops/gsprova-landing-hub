import { useEffect } from 'react';
import { trackScroll, trackTimeOnPage } from '@/lib/analytics';

export const ScrollTracker = () => {
  useEffect(() => {
    let timeOnPageStart = Date.now();
    let scrollPercentages: Set<number> = new Set();
    let ticking = false;
    let cachedScrollHeight = 0;
    let resizeTimeout: number;

    // Optimized scroll height calculation with batched reads
    const updateScrollHeight = () => {
      // Use requestAnimationFrame to batch layout reads and avoid forced reflows
      requestAnimationFrame(() => {
        cachedScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      });
    };

    // Debounced and optimized scroll handler
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Batch all layout reads together
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Only update scroll height if not cached, and defer it
          if (cachedScrollHeight === 0) {
            // Defer the height calculation to prevent forced reflow during scroll
            requestAnimationFrame(() => {
              cachedScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            });
            ticking = false;
            return;
          }
          
          const scrollPercent = cachedScrollHeight > 0 
            ? Math.round((scrollTop / cachedScrollHeight) * 100) 
            : 0;

          // Track scroll milestones (25%, 50%, 75%, 100%)
          const milestones = [25, 50, 75, 100];
          milestones.forEach(milestone => {
            if (scrollPercent >= milestone && !scrollPercentages.has(milestone)) {
              scrollPercentages.add(milestone);
              trackScroll(milestone);
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Debounced resize handler to prevent excessive recalculations
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        updateScrollHeight();
      }, 150);
    };

    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - timeOnPageStart) / 1000);
      if (timeOnPage > 10) { // Only track if user spent more than 10 seconds
        trackTimeOnPage(timeOnPage);
      }
    };

    // Initialize scroll height
    updateScrollHeight();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
};