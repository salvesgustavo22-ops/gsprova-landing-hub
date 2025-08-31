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
    <section className="section-modern py-16 lg:py-24">
      <div className="section-content container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Como Funciona?
          </h2>
          <p className="text-lg text-white/85 max-w-2xl mx-auto font-light">
            Processo simples e direto para você começar a estudar hoje mesmo
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-white/30 to-transparent transform -translate-y-1/2 z-0"></div>
                )}
                
                {/* Icon Circle */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-md rounded-full border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-white">
                {step.title}
              </h3>
              
              <p className="text-white/80 leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Redesigned Success Box */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center shadow-xl">
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
              <div className="flex items-center gap-3 bg-white/15 rounded-full px-4 py-2 border border-white/20">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white font-medium text-sm">Pagamentos Seguros</span>
              </div>
              <div className="flex items-center gap-3 bg-white/15 rounded-full px-4 py-2 border border-white/20">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white font-medium text-sm">Método Testado</span>
              </div>
              <div className="flex items-center gap-3 bg-white/15 rounded-full px-4 py-2 border border-white/20">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white font-medium text-sm">Resultados Comprovados</span>
              </div>
            </div>
          
            <button 
              onClick={() => {
                trackWhatsAppClick('how_it_works_cta', 'whatsapp_direct');
                const message = encodeURIComponent("Oi, quero começar agora meus estudos. Vim pelo site GS Aprova.");
                window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
              }}
              className="btn-modern text-lg px-8 py-6"
            >
              Falar com a equipe agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};