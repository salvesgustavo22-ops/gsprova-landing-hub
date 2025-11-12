import { Calculator, PenTool, Target } from 'lucide-react';

const benefits = [
  {
    icon: Calculator,
    title: 'Matemática prática',
    description: 'Exercícios no estilo da prova, sem enrolação.',
  },
  {
    icon: PenTool,
    title: 'Correção de redação',
    description: 'Feedback linha a linha para transformar erros em nota alta.',
  },
  {
    icon: Target,
    title: 'Trilha personalizada',
    description: 'Guia de estudo claro, para não perder tempo com o que não cai.',
  },
];

export const Benefits = () => {
  return (
    <section className="section-modern py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="group text-center">
              <div className="mb-6 inline-flex size-16 items-center justify-center rounded-xl bg-accent shadow-cta transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow">
                <benefit.icon className="size-8 text-accent-foreground" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-white">{benefit.title}</h3>

              <p className="font-light leading-relaxed text-white/90">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
