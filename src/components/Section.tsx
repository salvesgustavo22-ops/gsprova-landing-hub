import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'neutral';
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export const Section = ({
  children,
  variant = 'light',
  className,
  id,
  'data-testid': testId,
}: SectionProps) => {
  const variantClasses = {
    light: 'bg-white text-foreground',
    dark: 'section-modern text-white',
    neutral: 'bg-muted text-foreground',
  };

  return (
    <section
      id={id}
      data-testid={testId}
      className={cn('py-16 md:py-24', variantClasses[variant], className)}
    >
      <div className="container mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
};
