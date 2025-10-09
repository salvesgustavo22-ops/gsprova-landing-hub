import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  avatar: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'ana',
    name: 'Ana Souza',
    quote: 'Passei de 480 para 680 na redação com as devolutivas da GS Aprova.',
    avatar: '/placeholder-avatar-1.jpg',
    initials: 'AS',
  },
  {
    id: 'pedro',
    name: 'Pedro Lima',
    quote: 'Revisão diária me deu segurança na objetiva e na redação.',
    avatar: '/placeholder-avatar-2.jpg',
    initials: 'PL',
  },
  {
    id: 'carla',
    name: 'Carla Mendes',
    quote: 'Mentoria semanal manteve meu ritmo até a prova.',
    avatar: '/placeholder-avatar-3.jpg',
    initials: 'CM',
  },
];

export const Testimonials = () => {
  const handleTestimonialView = () => {
    trackEvent('testimonial_view', {
      section: 'resultados_reais',
    });
  };

  return (
    <section className="bg-background py-16" onLoad={handleTestimonialView}>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Resultados reais</h2>
          <p className="mx-auto max-w-2xl text-lg text-[#1E3A8A]">
            Veja como nossos alunos transformaram seus estudos e conquistaram suas aprovações
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {testimonials.map(testimonial => (
            <Card
              key={testimonial.id}
              className="rounded-xl border border-border/50 bg-card shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-start">
                  <Quote className="mr-3 size-8 shrink-0 text-primary" />
                  <p className="leading-relaxed text-[#1E3A8A]">"{testimonial.quote}"</p>
                </div>

                <div className="flex items-center">
                  <Avatar className="mr-3 size-12">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={`Foto de perfil de ${testimonial.name}`}
                    />
                    <AvatarFallback className="bg-primary font-semibold text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-[#1E3A8A]">{testimonial.name}</p>
                    <p className="text-sm text-[#1E3A8A]">Aluno GS Aprova</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#1E3A8A]">
            <div className="flex items-center space-x-2">
              <div className="size-2 rounded-full bg-success"></div>
              <span>+900 alunos aprovados</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="size-2 rounded-full bg-success"></div>
              <span>95% de satisfação</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="size-2 rounded-full bg-success"></div>
              <span>Nota média 70/100 em redação</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
