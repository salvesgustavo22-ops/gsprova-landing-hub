import { useState, useEffect } from 'react';

/**
 * Hook to track the currently active section based on scroll position
 * Uses IntersectionObserver to determine which section is in view
 */
export const useActiveSection = (sectionIds: string[], threshold = 0.6) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Create observers for each section
    const observers = new Map<string, IntersectionObserver>();
    const sectionVisibility = new Map<string, boolean>();

    sectionIds.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          sectionVisibility.set(sectionId, entry.isIntersecting);
          
          // Find the first visible section from top to bottom
          const visibleSections = Array.from(sectionVisibility.entries())
            .filter(([_, isVisible]) => isVisible)
            .map(([id]) => id);

          if (visibleSections.length > 0) {
            // Get the order of sections as they appear in the DOM
            const orderedSections = sectionIds.filter(id => visibleSections.includes(id));
            setActiveSection(orderedSections[0] || '');
          } else if (!entry.isIntersecting && activeSection === sectionId) {
            // If current active section is no longer visible, clear it
            setActiveSection('');
          }
        },
        { 
          threshold,
          rootMargin: '-10% 0px -80% 0px' // Trigger when section is 10% from top
        }
      );

      observer.observe(element);
      observers.set(sectionId, observer);
    });

    // Cleanup function
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionIds, threshold, activeSection]);

  return activeSection;
};