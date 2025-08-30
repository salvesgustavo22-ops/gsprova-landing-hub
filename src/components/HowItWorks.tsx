import { UserPlus, Route, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackPageSection } from "@/lib/analytics";

const steps = [
  {
    icon: UserPlus,
    title: "1. Fale conosco",
    description: "Entre em contato para solicitar o tipo de serviço desejado, nos contando um pouco mais da sua necessidade"
  },
  {
    icon: Route, 
    title: "2. Diagnóstico",
    description: "Nossa equipe entrará em contato para entender melhor a necessidade para montar um plano personalizado para seu serviço"
  },
  {
    icon: TrendingUp,
    title: "3. Aceite",
    description: "Nossa equipe enviará uma proposta a ser aprovada"
  },
  {
    icon: UserPlus,
    title: "4. Hora de aprender",
    description: "Vamos embarcar juntos no seu processo de aprendizado"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">
            Como Funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Processo simples e direto para você começar a estudar hoje mesmo
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
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

        {/* Redesigned Success Box */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-success to-success/90 rounded-xl p-8 text-center text-white shadow-xl">
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
              <div className="flex items-center gap-3 bg-white/20 rounded-full px-4 py-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white font-medium text-sm">Pagamentos Seguros</span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 rounded-full px-4 py-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white font-medium text-sm">Método Testado</span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 rounded-full px-4 py-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white font-medium text-sm">Resultados Comprovados</span>
              </div>
            </div>
          
            <button 
              onClick={() => {
                trackWhatsAppClick('how_it_works_cta', 'whatsapp_direct');
                window.open('https://wa.me/5511974969036', '_blank');
              }}
              className="btn-hero bg-accent hover:bg-accent/90 text-primary text-lg px-8 py-6"
            >
              Falar com a equipe agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};