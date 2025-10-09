import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  'data-testid': testId,
}: TestimonialCardProps) => {
  return (
    <Card
      data-testid={testId}
      className={cn(
        'rounded-2xl border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-[#FBBF24]/20 dark:bg-[#1E3A8A] dark:text-white',
        className
      )}
    >
      <CardContent className="space-y-4 p-0">
        {/* Rating Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="size-4 fill-[#FBBF24] text-[#FBBF24]" />
          ))}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-sm italic md:text-base">"{text}"</blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-3">
          {photo ? (
            <img
              src={photo}
              alt={`Foto de ${name}`}
              className="size-10 rounded-full border-2 border-[#FBBF24] object-cover"
            />
          ) : (
            <div className="flex size-10 items-center justify-center rounded-full bg-[#FBBF24] text-sm font-semibold text-[#1E3A8A]">
              {name.charAt(0)}
            </div>
          )}

          <div>
            <div className="text-sm font-semibold">{name}</div>
            {score && <div className="text-xs font-medium text-[#FBBF24]">{score}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
