import { MessageCircleIcon, SearchIcon, BookOpenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: MessageCircleIcon,
    title: "1. Fale no WhatsApp",
    description: "Entre em contato conosco pelo WhatsApp e conte suas necessidades específicas"
  },
  {
    icon: SearchIcon, 
    title: "2. Diagnóstico Rápido",
    description: "Fazemos uma avaliação rápida para entender suas dificuldades e objetivos"
  },
  {
    icon: BookOpenIcon,
    title: "3. Aula/Correção Hoje",
    description: "Começamos imediatamente com aulas personalizadas ou correções detalhadas"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Como Funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Processo simples e direto para você começar a estudar hoje mesmo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform -translate-y-1/2 z-0"></div>
                )}
                
                {/* Icon Circle */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-success rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-success-light border border-success/20 rounded-lg px-6 py-4 mb-8">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-success font-medium">
              Atendimento rápido • Método testado • Resultados comprovados
            </span>
          </div>
          
          <Button 
            onClick={() => window.location.href = '/contato'}
            className="btn-hero text-lg px-8 py-6"
          >
            Começar minha preparação hoje
          </Button>
        </div>
      </div>
    </section>
  );
};