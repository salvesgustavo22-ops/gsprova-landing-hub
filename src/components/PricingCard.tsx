import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
  'data-testid': testId
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
        "relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:scale-105",
        highlight ? "border-[#FBBF24] border-2 shadow-lg" : "border-[#E5E7EB]",
        className
      )}
    >
      {badge && (
        <Badge 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FBBF24] text-[#1E3A8A] hover:bg-[#FBBF24]/90"
        >
          {badge}
        </Badge>
      )}
      
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl md:text-2xl font-bold mb-2">
          {title}
        </CardTitle>
        <div className="text-3xl md:text-4xl font-bold text-[#1E3A8A] dark:text-white">
          {price}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[#FBBF24] mt-0.5 flex-shrink-0" />
              <span className="text-sm md:text-base">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          onClick={handleCTAClick}
          className="w-full bg-[#FBBF24] text-[#1E3A8A] hover:brightness-95 font-semibold py-3 rounded-lg transition-all duration-300"
          data-analytics={`cta_pricing_${title.toLowerCase().replace(/\s+/g, '_')}`}
        >
          {ctaLabel}
        </Button>
      </CardContent>
    </Card>
  );
};