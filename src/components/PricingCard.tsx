import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
  className?: string;
  'data-testid'?: string;
}

export const PricingCard = ({
  title,
  price,
  features,
  highlight = false,
  ctaLabel,
  ctaHref,
  badge,
  className,
  'data-testid': testId,
}: PricingCardProps) => {
  const handleCTAClick = () => {
    if (ctaHref.startsWith('#')) {
      const element = document.querySelector(ctaHref);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = ctaHref;
    }
  };

  return (
    <Card
      data-testid={testId}
      className={cn(
        'relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 md:p-8',
        highlight ? 'border-2 border-[#FBBF24] shadow-lg' : 'border-[#E5E7EB]',
        className
      )}
    >
      {badge && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FBBF24] text-[#1E3A8A] hover:bg-[#FBBF24]/90">
          {badge}
        </Badge>
      )}

      <CardHeader className="pb-4 text-center">
        <CardTitle className="mb-2 text-xl font-bold md:text-2xl">{title}</CardTitle>
        <div className="text-3xl font-bold text-[#1E3A8A] dark:text-white md:text-4xl">{price}</div>
      </CardHeader>

      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="mt-0.5 size-5 shrink-0 text-[#FBBF24]" />
              <span className="text-sm md:text-base">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={handleCTAClick}
          className="w-full rounded-lg bg-[#FBBF24] py-3 font-semibold text-[#1E3A8A] transition-all duration-300 hover:brightness-95"
          data-analytics={`cta_pricing_${title.toLowerCase().replace(/\s+/g, '_')}`}
        >
          {ctaLabel}
        </Button>
      </CardContent>
    </Card>
  );
};
