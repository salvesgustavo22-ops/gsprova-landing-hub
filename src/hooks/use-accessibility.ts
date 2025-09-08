import { useEffect, useRef, useState } from 'react';

/**
 * Hook for managing focus trap within a component
 */
export const useFocusTrap = (isActive: boolean = true) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement?.focus();
          e.preventDefault();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        (document.activeElement as HTMLElement)?.blur();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscapeKey);

    // Focus first element when trap becomes active
    firstFocusableElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isActive]);

  return containerRef;
};

/**
 * Hook for managing ARIA live regions for screen readers
 */
export const useAriaLiveRegion = () => {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite');

  const announce = (text: string, level: 'polite' | 'assertive' = 'polite') => {
    setMessage(''); // Clear first to ensure announcement
    setTimeout(() => {
      setPriority(level);
      setMessage(text);
    }, 10);
  };

  const clear = () => setMessage('');

  return {
    message,
    priority,
    announce,
    clear,
  };
};

/**
 * Hook for managing reduced motion preferences
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook for managing color scheme preferences
 */
export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | 'no-preference'>('no-preference');

  useEffect(() => {
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)');
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateColorScheme = () => {
      if (darkQuery.matches) {
        setColorScheme('dark');
      } else if (lightQuery.matches) {
        setColorScheme('light');
      } else {
        setColorScheme('no-preference');
      }
    };

    updateColorScheme();

    lightQuery.addEventListener('change', updateColorScheme);
    darkQuery.addEventListener('change', updateColorScheme);

    return () => {
      lightQuery.removeEventListener('change', updateColorScheme);
      darkQuery.removeEventListener('change', updateColorScheme);
    };
  }, []);

  return colorScheme;
};

/**
 * Hook for managing keyboard navigation
 */
export const useKeyboardNavigation = () => {
  const [isNavigatingWithKeyboard, setIsNavigatingWithKeyboard] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsNavigatingWithKeyboard(true);
      }
    };

    const handleMouseDown = () => {
      setIsNavigatingWithKeyboard(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isNavigatingWithKeyboard;
};