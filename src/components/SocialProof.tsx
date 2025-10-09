import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, Clock, Award } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria Silva',
    grade: 'Aprovada na FUVEST',
    content: 'A correção das redações foi o diferencial. Passei de 600 para 880 pontos!',
    rating: 5,
  },
  {
    name: 'João Pedro',
    grade: 'ENEM 2023 - 920 em Mat',
    content:
      'As aulas de matemática são diretas ao ponto. Aprendi em 1 mês o que não conseguia há 6.',
    rating: 5,
  },
  {
    name: 'Ana Clara',
    grade: 'Medicina - USP',
    content: 'A trilha personalizada me ajudou a focar só no que importa. Economizei muito tempo.',
    rating: 5,
  },
];

const metrics = [
  {
    icon: Users,
    value: '+500',
    label: 'Alunos aprovados',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Avaliação média',
  },
  {
    icon: Clock,
    value: '< 2h',
    label: 'Tempo de resposta',
  },
  {
    icon: Award,
    value: '95%',
    label: 'Taxa de aprovação',
  },
];

export const SocialProof = () => {
  return (
    <>
      {/* Security Indicators Section */}
      <section className="section-modern py-8">
        <div className="section-content container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex max-w-lg items-center justify-center gap-6 rounded-lg border border-white/20 bg-white/10 py-4 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2 text-white">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="text-sm font-medium">SSL Seguro</span>
              </div>
              <div className="h-4 w-px bg-white/30"></div>
              <div className="flex items-center gap-2 text-white">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium">LGPD Compliant</span>
              </div>
              <div className="h-4 w-px bg-white/30"></div>
              <div className="flex items-center gap-2 text-white">
                <span className="text-sm font-medium">💳 Pagamento Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-modern py-16 lg:py-20">
        <div className="section-content container mx-auto px-4">
          {/* Metrics */}
          <div className="mx-auto mb-16 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/20 bg-white/10 p-6 text-center shadow-lg backdrop-blur-md"
              >
                <metric.icon className="mx-auto mb-3 size-8 text-white" />
                <div className="mb-1 text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-sm font-light text-white/80">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Title */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
              O que nossos alunos dizem
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-light text-white/85">
              Resultados reais de quem já transformou seus estudos conosco
            </p>
          </div>

          {/* Testimonials */}
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-white/20 bg-white/10 shadow-lg backdrop-blur-md transition-shadow duration-300 hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-5 fill-accent text-accent" />
                    ))}
                  </div>

                  <blockquote className="mb-4 font-light leading-relaxed text-white/85">
                    "{testimonial.content}"
                  </blockquote>

                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm font-light text-white/70">{testimonial.grade}</div>
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
