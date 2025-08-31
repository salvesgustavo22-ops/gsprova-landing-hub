import { Calculator, PenTool, Target } from "lucide-react";

const benefits = [
  {
    icon: Calculator,
    title: "Matemática prática",
    description: "Exercícios no estilo da prova, sem enrolação."
  },
  {
    icon: PenTool,
    title: "Correção de redação",
    description: "Feedback linha a linha para transformar erros em nota alta."
  },
  {
    icon: Target,
    title: "Trilha personalizada", 
    description: "Guia de estudo claro, para não perder tempo com o que não cai."
  }
];

export const Benefits = () => {
  return (
    <section className="section-modern py-16 lg:py-20">
      <div className="section-content container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">
                {benefit.title}
              </h3>
              
              <p className="text-white/85 leading-relaxed font-light">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};