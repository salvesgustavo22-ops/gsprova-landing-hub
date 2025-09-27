import { cn } from "@/lib/utils";

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
  'data-testid': testId 
}: SectionProps) => {
  const variantClasses = {
    light: 'bg-white text-[#111827]',
    dark: 'bg-[#1E3A8A] text-white',
    neutral: 'bg-[#F3F4F6] text-[#111827]'
  };

  return (
    <section 
      id={id}
      data-testid={testId}
      className={cn(
        "py-16 md:py-24",
        variantClasses[variant],
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        {children}
      </div>
    </section>
  );
};