import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon, StarIcon } from 'lucide-react';
import { trackPlanClick, trackServiceSelection, trackPageSection } from '@/lib/analytics';

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
    id: 'aula-avulsa-math',
    title: 'Aula Avulsa',
    description:
      'Promoção - Aula personalizada de Matemática focada nas suas dificuldades específicas',
    price: 'De R$ 70 por R$39,90',
    features: [
      '1 aula de 50min',
      'Exercícios personalizados',
      'Material didático',
      'Suporte pós-aula',
      'Até 6x no cartão',
    ],
  },
  {
    id: 'pacote-4-aulas-math',
    title: 'Pacote 4 Aulas',
    description: 'Pacote econômico com 4 aulas de Matemática e acompanhamento completo',
    price: 'R$ 129,99',
    originalPrice: 'R$ 280',
    features: [
      '4 aulas de 50min cada',
      'Plano de estudos',
      'Exercícios exclusivos',
      'Relatório de progresso',
      'Suporte contínuo',
      'Até 6x no cartão',
    ],
    badge: 'Mais Popular',
    popular: true,
  },
];

const essayServices: ServiceDetail[] = [
  {
    id: 'correcao-avulsa',
    title: 'Correção Avulsa - Promoção',
    description: 'Correção detalhada da sua redação com feedback personalizado',
    price: 'R$ 9,90 para as 100 primeiras; R$19,90',
    features: [
      'Correção detalhada',
      'Feedback personalizado',
      'Nota estimada',
      'Dicas de melhoria',
      'Entrega em 48h',
      'Até 6x no cartão',
    ],
  },
  {
    id: 'pacote-completo-essay',
    title: 'Pacote Completo - promoção!',
    description: 'Pacote com correções ilimitadas e acompanhamento mensal',
    price: 'R$ 149,90',
    originalPrice: 'R$ 350',
    features: [
      'Correções ilimitadas/mês',
      'Acompanhamento semanal',
      'Banco de temas',
      'Videoaulas exclusivas',
      'Mentoria personalizada',
      'Até 6x no cartão',
    ],
    badge: 'Melhor Custo-Benefício',
    popular: true,
  },
];

const studyPathServices: ServiceDetail[] = [
  {
    id: 'trilha-personalizada',
    title: 'Trilha Personalizada - Promoção!',
    description:
      'Criamos trilhas com conteúdos e exercícios baseados em uma avaliação das suas necessidades, além de oferecer mentoria',
    price: 'R$ 69,90',
    features: [
      'Avaliação diagnóstica',
      'Trilha personalizada',
      'Exercícios direcionados',
      'Mentoria semanal',
      'Acompanhamento mensal',
      'Até 6x no cartão',
    ],
  },
];

const completeServices: ServiceDetail[] = [
  {
    id: 'experiencia-completa',
    title: 'Experiência Completa',
    description:
      'Pacote completo com aulas de Matemática, correção de redação e trilha de aprendizado personalizada',
    price: 'R$ 299,90',
    originalPrice: 'R$ 699,90',
    features: [
      '4 aulas de Matemática',
      'Correções ilimitadas de redação',
      'Trilha personalizada',
      'Mentoria semanal',
      'Suporte contínuo',
      'Até 6x no cartão',
    ],
    badge: 'Melhor Oferta',
    popular: true,
  },
];

export const Services = () => {
  const [activeService, setActiveService] = useState<'math' | 'essay' | 'study-path' | 'complete'>(
    'math'
  );

  const handlePlanClick = (service: ServiceDetail, category: string) => {
    // Track plan selection
    trackPlanClick(service.title, service.price, category);

    const message = encodeURIComponent(
      `Oi, tenho interesse no plano "${category} - ${service.title}" por ${service.price}. Vim pelo site GS Aprova.`
    );
    window.open(`https://wa.me/+5511974969036?text=${message}`, '_blank');
  };

  const handleServiceClick = (service: 'math' | 'essay' | 'study-path' | 'complete') => {
    // Track service selection
    const serviceNames = {
      math: 'Matemática',
      essay: 'Redação',
      'study-path': 'Trilhas de Estudo',
      complete: 'Experiência Completa',
    };

    trackServiceSelection(serviceNames[service], service);
    trackPageSection('services', 'service_change');

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
    <section id="servicos" className="section-modern py-16 lg:py-24">
      <div className="section-content container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">Nossos Serviços</h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-white/85">
            Escolha o serviço ideal para sua preparação e comece hoje mesmo. aproveite as promoções!
          </p>
        </div>

        {/* Service Selection Bands */}
        <div className="mx-auto mb-12 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">
          <button
            onClick={() => handleServiceClick('math')}
            className={`rounded-xl border-2 p-6 transition-all duration-300 ${
              activeService === 'math'
                ? 'card-navy-selected text-white'
                : 'card-navy text-white/80 hover:text-white'
            }`}
          >
            <div className={`mb-2 ${activeService === 'math' ? 'text-white' : 'text-white/80'}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                <path d="M8 6h8" />
                <path d="M16 14v4" />
                <path d="M8 10h8" />
                <path d="M8 18h5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Matemática</h3>
            <p className="text-sm font-light opacity-80">Aulas personalizadas</p>
          </button>

          <button
            onClick={() => handleServiceClick('essay')}
            className={`rounded-xl border-2 p-6 transition-all duration-300 ${
              activeService === 'essay'
                ? 'card-navy-selected text-white'
                : 'card-navy text-white/80 hover:text-white'
            }`}
          >
            <div className={`mb-2 ${activeService === 'essay' ? 'text-white' : 'text-white/80'}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Redação</h3>
            <p className="text-sm font-light opacity-80">Correções detalhadas</p>
          </button>

          <button
            onClick={() => handleServiceClick('study-path')}
            className={`rounded-xl border-2 p-6 transition-all duration-300 ${
              activeService === 'study-path'
                ? 'card-navy-selected text-white'
                : 'card-navy text-white/80 hover:text-white'
            }`}
          >
            <div
              className={`mb-2 ${activeService === 'study-path' ? 'text-white' : 'text-white/80'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Trilhas de Estudo</h3>
            <p className="text-sm font-light opacity-80">Estudo personalizado</p>
          </button>

          <button
            onClick={() => handleServiceClick('complete')}
            className={`rounded-xl border-2 p-6 transition-all duration-300 ${
              activeService === 'complete'
                ? 'card-navy-selected text-white'
                : 'card-navy text-white/80 hover:text-white'
            }`}
          >
            <div
              className={`mb-2 ${activeService === 'complete' ? 'text-white' : 'text-white/80'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="m9 14 2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Experiência Completa</h3>
            <p className="text-sm font-light opacity-80">Tudo incluído</p>
          </button>
        </div>

        {/* Service Cards */}
        <div
          className={`mx-auto grid max-w-4xl gap-8 ${
            currentServices.length === 1 ? 'max-w-2xl md:grid-cols-1' : 'md:grid-cols-2'
          }`}
        >
          {currentServices.map(service => (
            <div key={service.id} className="relative">
              {service.badge && (
                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                  <span className="whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-lg sm:text-sm">
                    {service.badge}
                  </span>
                </div>
              )}

              <div
                className={`h-full rounded-xl bg-white p-6 shadow-lg ${service.popular ? 'ring-2 ring-primary' : ''}`}
              >
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="mb-2 text-2xl font-bold text-primary">{service.title}</h3>
                    <p className="text-primary/70">{service.description}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {service.originalPrice && (
                        <span className="text-lg text-primary/50 line-through">
                          {service.originalPrice}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-primary">{service.price}</span>
                    </div>
                    {(service.features.some(f => f.includes('6x no cartão')) ||
                      service.id === 'experiencia-completa') && (
                      <p className="text-sm font-medium text-accent">Até 6x no cartão</p>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-success"></div>
                        <span className="text-sm text-primary/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      handlePlanClick(
                        service,
                        activeService === 'math'
                          ? 'Matemática'
                          : activeService === 'essay'
                            ? 'Redação'
                            : activeService === 'study-path'
                              ? 'Trilhas de Estudo'
                              : 'Experiência Completa'
                      )
                    }
                    className="btn-yellow w-full px-6 py-3"
                  >
                    {activeService === 'math'
                      ? 'Quero aulas de matemática'
                      : activeService === 'essay'
                        ? 'Enviar minha redação'
                        : activeService === 'study-path'
                          ? 'Montar minha trilha'
                          : 'Quero o plano completo'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
