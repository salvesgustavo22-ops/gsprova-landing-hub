import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  avatar: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: "ana",
    name: "Ana Souza",
    quote: "Passei de 480 para 680 na redação com as devolutivas da GS Aprova.",
    avatar: "/placeholder-avatar-1.jpg",
    initials: "AS"
  },
  {
    id: "pedro",
    name: "Pedro Lima", 
    quote: "Revisão diária me deu segurança na objetiva e na redação.",
    avatar: "/placeholder-avatar-2.jpg",
    initials: "PL"
  },
  {
    id: "carla",
    name: "Carla Mendes",
    quote: "Mentoria semanal manteve meu ritmo até a prova.",
    avatar: "/placeholder-avatar-3.jpg",
    initials: "CM"
  }
];

export const Testimonials = () => {
  const handleTestimonialView = () => {
    trackEvent('testimonial_view', {
      section: 'resultados_reais'
    });
  };

  return (
    <section className="py-16 bg-background" onLoad={handleTestimonialView}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resultados reais
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja como nossos alunos transformaram seus estudos e conquistaram suas aprovações
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="bg-card shadow-lg rounded-xl border border-border/50 hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <Quote className="w-8 h-8 text-primary mr-3 flex-shrink-0" />
                  <p className="text-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-3">
                    <AvatarImage 
                      src={testimonial.avatar} 
                      alt={`Foto de perfil de ${testimonial.name}`}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Aluno GS Aprova
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>+900 alunos aprovados</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>95% de satisfação</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Nota média 70/100 em redação</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};