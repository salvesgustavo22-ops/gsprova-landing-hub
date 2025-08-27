import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, StarIcon } from "lucide-react";
import { trackPlanClick } from "@/lib/analytics";

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  features: string[];
  badge?: string;
  popular?: boolean;
}

const mathServices: ServiceDetail[] = [
  {
    id: "aula-avulsa-math",
    title: "Aula Avulsa",
    description: "Aula personalizada de Matemática focada nas suas dificuldades específicas",
    price: "R$ 70",
    features: ["1 aula de 50min", "Exercícios personalizados", "Material didático", "Suporte pós-aula", "Até 6x no cartão"]
  },
  {
    id: "pacote-4-aulas-math", 
    title: "Pacote 4 Aulas",
    description: "Pacote econômico com 4 aulas de Matemática e acompanhamento completo",
    price: "R$ 250",
    originalPrice: "R$ 280",
    features: ["4 aulas de 50min cada", "Plano de estudos", "Exercícios exclusivos", "Relatório de progresso", "Suporte contínuo", "Até 6x no cartão"],
    badge: "Mais Popular",
    popular: true
  }
];

const essayServices: ServiceDetail[] = [
  {
    id: "correcao-avulsa", 
    title: "Correção Avulsa",
    description: "Correção detalhada da sua redação com feedback personalizado",
    price: "R$ 70",
    features: ["Correção detalhada", "Feedback personalizado", "Nota estimada", "Dicas de melhoria", "Entrega em 48h", "Até 6x no cartão"]
  },
  {
    id: "pacote-completo-essay",
    title: "Pacote Completo", 
    description: "Pacote com correções ilimitadas e acompanhamento mensal",
    price: "R$ 250",
    originalPrice: "R$ 350",
    features: ["Correções ilimitadas/mês", "Acompanhamento semanal", "Banco de temas", "Videoaulas exclusivas", "Mentoria personalizada", "Até 6x no cartão"],
    badge: "Melhor Custo-Benefício",
    popular: true
  }
];

const studyPathServices: ServiceDetail[] = [
  {
    id: "trilha-personalizada",
    title: "Trilha Personalizada",
    description: "Criamos trilhas com conteúdos e exercícios baseados em uma avaliação das suas necessidades, além de oferecer mentoria",
    price: "R$ 350",
    features: ["Avaliação diagnóstica", "Trilha personalizada", "Exercícios direcionados", "Mentoria semanal", "Acompanhamento mensal", "Até 6x no cartão"]
  }
];

const completeServices: ServiceDetail[] = [
  {
    id: "experiencia-completa",
    title: "Experiência Completa",
    description: "Pacote completo com aulas de Matemática, correção de redação e trilha de aprendizado personalizada",
    price: "R$ 720",
    originalPrice: "R$ 920",
    features: ["4 aulas de Matemática", "Correções ilimitadas de redação", "Trilha personalizada", "Mentoria semanal", "Suporte contínuo", "Até 6x no cartão"],
    badge: "Melhor Oferta",
    popular: true
  }
];

export const Services = () => {
  const [activeService, setActiveService] = useState<'math' | 'essay' | 'study-path' | 'complete'>('math');

  const handlePlanClick = (service: ServiceDetail, category: string) => {
    const message = encodeURIComponent(`Oi, tenho interesse no plano "${category} - ${service.title}" por ${service.price}. Vim pelo site GS Aprova.`);
    window.open(`https://wa.me/+5511974969036?text=${message}`, '_blank');
  };

  const handleServiceClick = (service: 'math' | 'essay' | 'study-path' | 'complete') => {
    setActiveService(service);
  };

  const getCurrentServices = () => {
    switch (activeService) {
      case 'math':
        return mathServices;
      case 'essay':
        return essayServices;
      case 'study-path':
        return studyPathServices;
      case 'complete':
        return completeServices;
      default:
        return mathServices;
    }
  };

  const currentServices = getCurrentServices();

  return (
    <section id="servicos" className="py-16 lg:py-24 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">
            Nossos Serviços
          </h2>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto">
            Escolha o serviço ideal para sua preparação e comece hoje mesmo
          </p>
        </div>

        {/* Service Selection Bands */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-6xl mx-auto">
          <button
            onClick={() => handleServiceClick('math')}
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              activeService === 'math'
                ? 'border-primary bg-primary text-white'
                : 'border-primary/30 hover:border-primary/50 bg-white text-primary'
            }`}
          >
            <div className="text-primary mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18"/>
                <path d="m19 9-5 5-4-4-3 3"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Matemática</h3>
            <p className="text-sm opacity-80">Aulas personalizadas</p>
          </button>
          
          <button
            onClick={() => handleServiceClick('essay')}
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              activeService === 'essay'
                ? 'border-primary bg-primary text-white'
                : 'border-primary/30 hover:border-primary/50 bg-white text-primary'
            }`}
          >
            <div className="text-primary mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Redação</h3>
            <p className="text-sm opacity-80">Correções detalhadas</p>
          </button>

          <button
            onClick={() => handleServiceClick('study-path')}
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              activeService === 'study-path'
                ? 'border-primary bg-primary text-white'
                : 'border-primary/30 hover:border-primary/50 bg-white text-primary'
            }`}
          >
            <div className="text-primary mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Trilhas de Estudo</h3>
            <p className="text-sm opacity-80">Estudo personalizado</p>
          </button>

          <button
            onClick={() => handleServiceClick('complete')}
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              activeService === 'complete'
                ? 'border-primary bg-primary text-white'
                : 'border-primary/30 hover:border-primary/50 bg-white text-primary'
            }`}
          >
            <div className="text-primary mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h9zm0 0v7c0 .552-.448 1-1 1H10c-.552 0-1-.448-1-1v-7"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Experiência Completa</h3>
            <p className="text-sm opacity-80">Tudo incluído</p>
          </button>
        </div>

        {/* Service Cards */}
        <div className={`grid gap-8 max-w-4xl mx-auto ${
          currentServices.length === 1 ? 'md:grid-cols-1 max-w-2xl' : 'md:grid-cols-2'
        }`}>
          {currentServices.map((service) => (
            <div key={service.id} className="relative">
              {service.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {service.badge}
                  </span>
                </div>
              )}
              
              <div className={`bg-white rounded-xl p-6 shadow-lg h-full ${service.popular ? 'ring-2 ring-primary' : ''}`}>
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 text-primary">{service.title}</h3>
                    <p className="text-primary/70">{service.description}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {service.originalPrice && (
                        <span className="text-lg text-primary/50 line-through">
                          {service.originalPrice}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-primary">
                        {service.price}
                      </span>
                    </div>
                    {(service.features.some(f => f.includes('6x no cartão')) || service.id === 'experiencia-completa') && (
                      <p className="text-sm text-accent font-medium">Até 6x no cartão</p>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-sm text-primary/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePlanClick(service, 
                      activeService === 'math' ? 'Matemática' : 
                      activeService === 'essay' ? 'Redação' : 
                      activeService === 'study-path' ? 'Trilhas de Estudo' : 
                      'Experiência Completa'
                    )}
                    className="w-full bg-accent hover:bg-accent-hover text-primary font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Quero este
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};