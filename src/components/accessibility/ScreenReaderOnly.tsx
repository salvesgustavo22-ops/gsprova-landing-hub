import { ReactNode } from 'react';

interface ScreenReaderOnlyProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Component for content that should only be visible to screen readers
 */
export const ScreenReaderOnly = ({ children, as: Component = 'span' }: ScreenReaderOnlyProps) => {
  return <Component className="sr-only">{children}</Component>;
};

/**
 * Announces content to screen readers when it changes
 */
export const LiveAnnouncement = ({
  children,
  priority = 'polite',
}: {
  children: ReactNode;
  priority?: 'polite' | 'assertive' | 'off';
}) => {
  return (
    <div className="sr-only" aria-live={priority} aria-atomic="true">
      {children}
    </div>
  );
};
