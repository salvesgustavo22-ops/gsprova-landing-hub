import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Clock, Award } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    grade: "Aprovada na FUVEST",
    content: "A correção das redações foi o diferencial. Passei de 600 para 880 pontos!",
    rating: 5
  },
  {
    name: "João Pedro",
    grade: "ENEM 2023 - 920 em Mat",
    content: "As aulas de matemática são diretas ao ponto. Aprendi em 1 mês o que não conseguia há 6.",
    rating: 5
  },
  {
    name: "Ana Clara", 
    grade: "Medicina - USP",
    content: "A trilha personalizada me ajudou a focar só no que importa. Economizei muito tempo.",
    rating: 5
  }
];

const metrics = [
  {
    icon: Users,
    value: "+500",
    label: "Alunos aprovados"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Avaliação média"
  },
  {
    icon: Clock,
    value: "< 2h",
    label: "Tempo de resposta"
  },
  {
    icon: Award,
    value: "95%",
    label: "Taxa de aprovação"
  }
];

export const SocialProof = () => {
  return (
    <>
      {/* Security Indicators Section */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex items-center justify-center gap-6 py-4 bg-white/90 backdrop-blur-sm rounded-lg border border-muted shadow-sm max-w-lg">
              <div className="flex items-center gap-2 text-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm font-medium">SSL Seguro</span>
              </div>
              <div className="w-px h-4 bg-muted"></div>
              <div className="flex items-center gap-2 text-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">LGPD Compliant</span>
              </div>
              <div className="w-px h-4 bg-muted"></div>
              <div className="flex items-center gap-2 text-primary">
                <span className="text-sm font-medium">💳 Pagamento Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="container mx-auto px-4">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-sm">
              <metric.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">
            O que nossos alunos dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resultados reais de quem já transformou seus estudos conosco
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                
                <blockquote className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                <div>
                  <div className="font-semibold text-primary">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.grade}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        </div>
      </section>
    </>
  );
};