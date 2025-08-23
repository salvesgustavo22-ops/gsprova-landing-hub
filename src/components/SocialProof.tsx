import { Card, CardContent } from "@/components/ui/card";
import { StarIcon, QuoteIcon } from "lucide-react";

const testimonials = [
  {
    name: "Marina Silva",
    age: 17,
    location: "São Paulo, SP",
    rating: 5,
    text: "Consegui tirar 920 na redação do ENEM! As correções do professor foram fundamentais para entender meus erros.",
    course: "Redação - Pacote Completo"
  },
  {
    name: "João Pedro",
    age: 18,
    location: "Santos, SP", 
    rating: 5,
    text: "Matemática era meu terror, mas com as aulas consegui passar na Fuvest. Método realmente funciona!",
    course: "Matemática - Pacote 4 Aulas"
  },
  {
    name: "Ana Carolina",
    age: 17,
    location: "Campinas, SP",
    rating: 5,
    text: "Professor muito atencioso e didático. Em 2 meses melhorei muito na redação. Super recomendo!",
    course: "Redação - Correção Avulsa"
  }
];

export const SocialProof = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            O que dizem nossos alunos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resultados reais de estudantes que conquistaram suas aprovações
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-service">
              <CardContent className="p-6">
                <div className="mb-4">
                  <QuoteIcon className="w-8 h-8 text-primary/20 mb-3" />
                  <p className="text-sm leading-relaxed mb-4">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}, {testimonial.age} anos</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                      <p className="text-xs text-primary font-medium">{testimonial.course}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">300+</div>
            <p className="text-sm text-muted-foreground">Alunos aprovados</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">4.9/5</div>
            <p className="text-sm text-muted-foreground">Avaliação média</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">24h</div>
            <p className="text-sm text-muted-foreground">Tempo de resposta</p>
          </div>
        </div>
      </div>
    </section>
  );
};