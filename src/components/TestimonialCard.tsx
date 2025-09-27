import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  photo?: string;
  text: string;
  score?: string;
  className?: string;
  'data-testid'?: string;
}

export const TestimonialCard = ({
  name,
  photo,
  text,
  score,
  className,
  'data-testid': testId
}: TestimonialCardProps) => {
  return (
    <Card 
      data-testid={testId}
      className={cn(
        "rounded-2xl p-6 bg-white border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 dark:bg-[#1E3A8A] dark:text-white dark:border-[#FBBF24]/20",
        className
      )}
    >
      <CardContent className="space-y-4 p-0">
        {/* Rating Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" 
            />
          ))}
        </div>
        
        {/* Testimonial Text */}
        <blockquote className="text-sm md:text-base italic">
          "{text}"
        </blockquote>
        
        {/* Author Info */}
        <div className="flex items-center gap-3">
          {photo ? (
            <img 
              src={photo}
              alt={`Foto de ${name}`}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#FBBF24]"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#FBBF24] flex items-center justify-center text-[#1E3A8A] font-semibold text-sm">
              {name.charAt(0)}
            </div>
          )}
          
          <div>
            <div className="font-semibold text-sm">{name}</div>
            {score && (
              <div className="text-xs text-[#FBBF24] font-medium">
                {score}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};