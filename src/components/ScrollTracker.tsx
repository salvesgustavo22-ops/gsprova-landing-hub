import { useEffect } from 'react';
import { trackScroll, trackTimeOnPage } from '@/lib/analytics';

export const ScrollTracker = () => {
  useEffect(() => {
    let timeOnPageStart = Date.now();
    let scrollPercentages: Set<number> = new Set();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

      // Track scroll milestones (25%, 50%, 75%, 100%)
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollPercentages.has(milestone)) {
          scrollPercentages.add(milestone);
          trackScroll(milestone);
        }
      });
    };

    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - timeOnPageStart) / 1000);
      if (timeOnPage > 10) { // Only track if user spent more than 10 seconds
        trackTimeOnPage(timeOnPage);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
};