import { useEffect } from 'react';
import { trackScroll, trackTimeOnPage } from '@/lib/analytics';

export const ScrollTracker = () => {
  useEffect(() => {
    let timeOnPageStart = Date.now();
    let scrollPercentages: Set<number> = new Set();
    let ticking = false;
    let cachedScrollHeight = 0;

    // Cache scroll height and update on resize
    const updateScrollHeight = () => {
      cachedScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    };

    // Throttled scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Use cached scroll height to avoid forced reflow
          if (cachedScrollHeight === 0) {
            updateScrollHeight();
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

    const handleResize = () => {
      // Update cached scroll height on resize
      updateScrollHeight();
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