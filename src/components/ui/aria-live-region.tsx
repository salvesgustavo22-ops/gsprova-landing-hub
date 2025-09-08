import { ReactNode } from 'react';

interface AriaLiveRegionProps {
  children: ReactNode;
  priority?: 'polite' | 'assertive' | 'off';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  className?: string;
}

/**
 * Accessible live region component for dynamic content announcements
 */
export const AriaLiveRegion = ({
  children,
  priority = 'polite',
  atomic = true,
  relevant = 'all',
  className = 'sr-only'
}: AriaLiveRegionProps) => {
  return (
    <div
      className={className}
      aria-live={priority}
      aria-atomic={atomic}
      aria-relevant={relevant}
      role="status"
    >
      {children}
    </div>
  );
};